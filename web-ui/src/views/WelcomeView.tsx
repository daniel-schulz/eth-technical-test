import React from 'react';
import './WelcomeView.css';
import {Link} from "react-router-dom";
import {Routes} from "../Routes";

export function WelcomeView() {
  return (
    <div className="app">
      <h1>Welcome to the ETH assessment platform!</h1>
      <div>
        <p>Please choose an assessment to start:</p>
        <div><Link to={Routes.CARD_SELECTION}>Card Selection Assessment</Link></div>
      </div>
    </div>
  );
}
