import React, {useState} from 'react';

import './Introduction.css';

interface IntroductionProps {
  onTestStart: (userIdentifier: string) => void;
}

export function Introduction({onTestStart}: IntroductionProps) {
  const [userIdentifier, setUserIdentifier] = useState('');

  function onUserIdentifierChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserIdentifier(event.target.value);
  }

  function onStartClick() {
    onTestStart(userIdentifier);
  }

  return (
    <div className="card-selection-introduction">
      <p>Welcome to the card selection test.</p>
      <p>In ten rounds you will see a pair of two cards. Please always select the card containing the highest
        number</p>
      <p>Enter your code or username and press "Start" to start your assessment:</p>
      <input type="text"
             value={userIdentifier}
             onChange={onUserIdentifierChange}
             placeholder="Enter your code or username"/>
      <button onClick={onStartClick}>Start</button>
    </div>
  );
}
