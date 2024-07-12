import React, {useEffect, useState} from 'react';

import './Introduction.css';
import {useAssessmentStore} from './hooks/useAssessmentStore';

export function Introduction() {
  const [userIdentifier, setUserIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initializeAssessment = useAssessmentStore((state) => state.initializeAssessment);
  const startNextRound = useAssessmentStore((state) => state.startNextRound);
  const existsAssessmentMetric = useAssessmentStore((state) => state.existsAssessmentMetric);

  async function onUserIdentifierChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserIdentifier(event.target.value);
    setErrorMessage(null);
  }

  useEffect(() => {
    existsAssessmentMetric(userIdentifier).then((exists) => {
      if (!exists) {
        setErrorMessage(null);
      } else {
        setErrorMessage(`An assessment for the code/user '${userIdentifier}' has already been taken.`);
      }
    });
  }, [userIdentifier, existsAssessmentMetric]);

  function onStartClick() {
    initializeAssessment(userIdentifier);
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
      <button onClick={onStartClick} disabled={!userIdentifier || !!errorMessage}>Start</button>
      {errorMessage && <div className="cardselection-introduction-errormessage">{errorMessage}</div>}
    </div>
  );
}
