import React from 'react';

import './CardComponent.css';

export enum CardColors {
  RED = "red",
  GREEN = "green",
  YELLOW = "orange",
}

type Card = {
  color: CardColors;
}

interface CardComponentProps {
  data: Card;
}

export function CardComponent({data}: CardComponentProps) {

  return (
    <div className="cardselection-components-card" style={{backgroundColor: data.color}}>
      <div>cv4xx</div>
    </div>
  );
}
