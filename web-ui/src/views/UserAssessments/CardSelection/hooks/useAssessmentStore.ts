import create from 'zustand';

import {AssessmentRound} from "../model/AssessmentRound";
import {Card} from "../model/Card";
import {getRandomCardColor} from "../model/CardColors";
import {getRandomLetters, getRandomNumber} from "../../../../utils/RandomGenerator";
import {CardSelectionAssessmentMetric} from "../model/CardSelectionAssessmentMetric";

interface CardSelectionAssessmentState {
  userId: string | null;
  openRounds: AssessmentRound[];
  completedRounds: AssessmentRound[];
  currentRound: AssessmentRound | null;

  /**
   * Initializes the assessment by creating the rounds and setting the user ID.
   * @param userId The user ID to associate with the assessment.
   */
  initializeAssessment: (userId: string) => void;

  /**
   * Starts the next round if there is one available.
   * @returns {boolean} True if a round was started, false if there are no more rounds available.
   */
  startNextRound: () => boolean;

  /**
   * Completes the current round by setting the selected card and calculating the user reaction time.
   * @param selectedCard The card that the user selected.
   */
  completeCurrentRound: (selectedCard: Card) => void;

  /**
   * Checks if an assessment metric exists for the user in the backend service.
   * @param userId The user ID to check for.
   */
  existsAssessmentMetric: (userId: string) => Promise<boolean>;

  /**
   * Sends the assessment metrics to the backend service.
   */
  sendAssessmentMetrics: () => Promise<void>;
}

const NUMBER_OF_ROUNDS = 10;

const createRandomCard = (existingNumber?: number): Card => {
  let number = getRandomNumber(1, 9);

  // We must ensure the new card has a different number if an existing number is provided
  while (number === existingNumber) {
    number = getRandomNumber(1, 9);
  }

  const numberOfRandomLetters = getRandomNumber(1, 4);
  const randomLetters = getRandomLetters(numberOfRandomLetters);

  const position = getRandomNumber(0, randomLetters.length);
  const displayText = randomLetters.slice(0, position) + number + randomLetters.slice(position);

  return {
    color: getRandomCardColor(),
    displayText: displayText,
  };
};

const createRandomRound = (): AssessmentRound => {
  const firstCard = createRandomCard();
  const secondCard = createRandomCard(parseInt(firstCard.displayText[0], 10));
  const cards = [firstCard, secondCard];
  return new AssessmentRound(cards);
};

export const useAssessmentStore = create<CardSelectionAssessmentState>((set, get) => ({
  userId: null,
  openRounds: [],
  completedRounds: [],
  currentRound: null,

  initializeAssessment: (userId): void => {
    const rounds = Array.from({length: NUMBER_OF_ROUNDS}, createRandomRound);
    set({userId, openRounds: rounds, completedRounds: [], currentRound: null});
  },

  startNextRound: (): boolean => {
    const state = get();
    if (state.currentRound) {
      throw new Error('Cannot start next round when current round is not completed');
    }
    if (state.openRounds.length === 0) {
      return false;
    }

    const [nextRound, ...remainingRounds] = state.openRounds;
    nextRound.startDateTime = new Date();
    set({currentRound: nextRound, openRounds: remainingRounds});
    return true;
  },

  completeCurrentRound: (selectedCard): void => {
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

  existsAssessmentMetric: async (userId): Promise<boolean> => {
    try {
      const url = new URL(window.location.href);
      const apiEndpoint = `${url}/Data/${userId}`;
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const assessmentMetric = await response.json();
      const isAssessmentMetricAvailable = !!assessmentMetric;
      return isAssessmentMetricAvailable;
    } catch (error) {
      return false;
    }
  },

  sendAssessmentMetrics: async (): Promise<void> => {
    const state = useAssessmentStore.getState();
    if (!state.userId) {
      throw new Error('Cannot send data without a user ID');
    }

    try {
      const assessmentMetric = new CardSelectionAssessmentMetric(
        state.userId,
        state.completedRounds,
      );
      const url = new URL(window.location.href);
      const apiEndpoint = `${url}/Data/${state.userId}`;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assessmentMetric),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
    } catch (error) {
      console.error('Failed to send assessment data:', error);
    }
  },
} as CardSelectionAssessmentState));

