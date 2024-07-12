import create from 'zustand';

import {AssessmentRound} from "../model/AssessmentRound";
import {Card} from "../model/Card";
import {CardColors} from "../model/CardColors";

interface AssessmentState {
  userId: string | null;
  openRounds: AssessmentRound[];
  completedRounds: AssessmentRound[];
  currentRound: AssessmentRound | null;
  startAssessment: (userId: string) => void;
  startNextRound: () => boolean;
  completeCurrentRound: (selectedCard: Card) => void;
  sendAssessmentData: () => Promise<void>;
}

const NUMBER_OF_ROUNDS = 10;

const getRandomNumber = (): number => Math.floor(Math.random() * 9) + 1;

const getRandomLetters = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(Math.random() * 4) + 1;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
};

const getRandomColor = (): CardColors => {
  const colors = [CardColors.RED, CardColors.GREEN, CardColors.YELLOW];
  return colors[Math.floor(Math.random() * colors.length)];
};

const createRandomCard = (existingNumber?: number): Card => {
  let number = getRandomNumber();
  // Ensure the new card has a different number if an existing number is provided
  while (number === existingNumber) {
    number = getRandomNumber();
  }
  return {
    color: getRandomColor(),
    displayText: `${number}${getRandomLetters()}`,
  };
};

const createRandomRound = (): AssessmentRound => {
  const firstCard = createRandomCard();
  const secondCard = createRandomCard(parseInt(firstCard.displayText[0], 10));
  const cards = [firstCard, secondCard];
  return new AssessmentRound(cards);
};

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  userId: null,
  openRounds: [],
  completedRounds: [],
  currentRound: null,
  startAssessment: (userId) => {
    console.log('startAssessment');
    const rounds = Array.from({length: NUMBER_OF_ROUNDS}, createRandomRound);
    console.log('rounds', rounds);
    set({userId, openRounds: rounds, completedRounds: [], currentRound: null});
  },
  startNextRound: () => {
    const state = get();
    if (state.currentRound) {
      throw new Error('Cannot start next round when current round is not completed');
    }
    if (state.openRounds.length === 0) {
      return false;
    }
    const [nextRound, ...remainingRounds] = state.openRounds;
    nextRound.startDateTime = new Date();
    set({ currentRound: nextRound, openRounds: remainingRounds });
    return true;
  },
  completeCurrentRound: (selectedCard) => {
    set((state) => {
      if (!state.currentRound) {
        throw new Error('Cannot complete round when there is no current round');
      }

      if (!state.currentRound.startDateTime) {
        throw new Error('Cannot complete round without starting it first');
      }

      const endDateTime = new Date();
      state.currentRound.userReactionTimeInMilliseconds = endDateTime.getTime() - state.currentRound.startDateTime.getTime();
      state.currentRound.selectedCard = selectedCard;

      const completedRounds = [...state.completedRounds, state.currentRound];
      return {currentRound: null, completedRounds};
    });
  },
  sendAssessmentData: async () => {
    const state = useAssessmentStore.getState(); // Get the current state
    if (!state.userId) {
      throw new Error('Cannot send data without a user ID');
    }
    const payload = {
      userId: state.userId,
      completedRounds: state.completedRounds,
    };
    try {
      const url = new URL(window.location.href);
      const apiEndpoint = `${url}/Data/${state.userId}`;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Successfully sent assessment data:', data);
    } catch (error) {
      console.error('Failed to send assessment data:', error);
    }
  },
}));

