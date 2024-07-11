import React, {useState} from 'react';

import './AssessmentRoundComponent.css';
import {CardComponent, CardColors} from "./CardComponent";

interface AssessmentProps {
}

export function AssessmentRoundComponent({}: AssessmentProps) {
  const [userIdentifier, setUserIdentifier] = useState('');

  return (
    <div className="cardselection-assessmentround">
      <CardComponent data={{color: CardColors.RED}}/>
      <CardComponent data={{color: CardColors.YELLOW}}/>
    </div>
  );
}
