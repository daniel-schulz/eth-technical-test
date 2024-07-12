import React from 'react';

import './CardComponent.css';
import {Card} from "../model/Card";

interface CardComponentProps {
  card: Card;
  onClick: (card: Card) => void;
}

export function CardComponent(props: CardComponentProps) {
  function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props.onClick(props.card);
  }

  return (
    <div
      className="cardselection-components-cardcomponent"
      style={{backgroundColor: props.card.color}}
      onClick={(event) => onClick(event)}
    >
      <div>{props.card.displayText}</div>
    </div>
  );
}
