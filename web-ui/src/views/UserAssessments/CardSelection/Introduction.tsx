import React, {useEffect, useState} from 'react';

import './Introduction.css';
import {useAssessmentStore} from './hooks/useAssessmentStore';
import {useMetric} from "./hooks/useMetrics";

export function Introduction() {
  const [userIdentifier, setUserIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startAssessment = useAssessmentStore((state) => state.startAssessment);
  const startNextRound = useAssessmentStore((state) => state.startNextRound);
  const metric = useMetric(userIdentifier);

  function onUserIdentifierChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserIdentifier(event.target.value);
    setErrorMessage(null);
  }

  useEffect(() => {
    if (!metric) {
      setErrorMessage(null);
    } else {
      setErrorMessage(`An assessment for the code/user '${userIdentifier}' has already been taken.`);
    }
  }, [metric]);

  function onStartClick() {
    startAssessment(userIdentifier);
    startNextRound();
  }

  return (
    <div className="cardselection-introduction">
      <p>Welcome to the card selection test.</p>
      <p>In ten rounds you will see a pair of two cards. Please always select the card containing the highest number</p>
      <p>Enter your code or username and press "Start" to start your assessment:</p>
      <input
        type="text"
        value={userIdentifier}
        onChange={onUserIdentifierChange}
        placeholder="Enter your code or username"
      />
      <button onClick={onStartClick} disabled={!userIdentifier || !!metric}>Start</button>
      {errorMessage && <div className="cardselection-introduction-errormessage">{errorMessage}</div>}
    </div>
  );
}
