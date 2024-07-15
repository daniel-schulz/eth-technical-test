import React from 'react';

import './AssessmentGame.css';
import {Card} from "../model/Card";
import {CardComponent} from './CardComponent';
import {useAssessmentStore} from '../hooks/useAssessmentStore';
import {AssessmentCompleted} from "../AssessmentCompleted";

export function AssessmentGame() {
  const currentRound = useAssessmentStore((state) => state.currentRound);

  if (!currentRound) {
    return (
      <AssessmentCompleted/>
    );
  }

  const cardComponents = currentRound.cards.map((card, index) => {
    return <CardComponent key={index} card={card}/>;
  });

  return <div className="cardselection-assessmentgame">
    {cardComponents}
  </div>;
}
