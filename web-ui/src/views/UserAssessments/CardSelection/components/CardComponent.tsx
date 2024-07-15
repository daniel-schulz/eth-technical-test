import React from 'react';

import './CardComponent.css';
import {Card} from "../model/Card";
import {useAssessmentStore} from "../hooks/useAssessmentStore";

interface CardComponentProps {
  card: Card;
}

export function CardComponent({card}: CardComponentProps) {
  const completeCurrentRound = useAssessmentStore((state) => state.completeCurrentRound);
  const startNextRound = useAssessmentStore((state) => state.startNextRound);
  const sendAssessmentMetrics = useAssessmentStore((state) => state.sendAssessmentMetrics);

  // TODO: Move to the store
  function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    completeCurrentRound(card);
    const hasAnotherRound = startNextRound();
    if (!hasAnotherRound) {
      sendAssessmentMetrics();
    }
  }

  return (
    <div
      className="cardselection-components-cardcomponent"
      style={{backgroundColor: card.color}}
      onClick={(event) => onClick(event)}
    >
      <div>{card.displayText}</div>
    </div>
  );
}
