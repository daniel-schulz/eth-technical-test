import React from 'react';

import './AssessmentGame.css';
import {Card} from "../model/Card";
import {CardComponent} from './CardComponent';
import {useAssessmentStore} from '../hooks/useAssessmentStore';
import {AssessmentCompleted} from "../AssessmentCompleted";

export function AssessmentGame() {
  const currentRound = useAssessmentStore((state) => state.currentRound);
  const completeCurrentRound = useAssessmentStore((state) => state.completeCurrentRound);
  const startNextRound = useAssessmentStore((state) => state.startNextRound);
  const sendAssessmentMetrics = useAssessmentStore((state) => state.sendAssessmentMetrics);

  function onCardClick(card: Card) {
    completeCurrentRound(card);
    const hasAnotherRound = startNextRound();
    if (!hasAnotherRound) {
      console.log('Last round completed');
      sendAssessmentMetrics();
    }
  }

  if (!currentRound) {
    return (
      <AssessmentCompleted/>
    );
  }

  const cardComponents = currentRound.cards.map((card, index) => {
    return <CardComponent key={index} card={card} onClick={onCardClick}/>;
  });

  return <div className="cardselection-assessmentgame">
    {cardComponents}
  </div>;
}
