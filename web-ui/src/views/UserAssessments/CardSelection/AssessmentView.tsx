import React from 'react';

import './AssessmentView.css';
import {Introduction} from "./Introduction";
import {AssessmentRoundComponent} from "./components/AssessmentRoundComponent";

export function AssessmentView() {
  const [isTestStarted, setIsTestStarted] = React.useState(false);

  function onTestStart(userIdentifier: string) {
    setIsTestStarted(true);
  }

  return (
    <div className="App">
      <h1>Card Selection Assessment</h1>
      <div>
        {!isTestStarted && (<Introduction onTestStart={onTestStart}/>)}
        {isTestStarted && (<AssessmentRoundComponent/>)}
      </div>
    </div>
  );
}
