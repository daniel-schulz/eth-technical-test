import React from 'react';
import {Link} from "react-router-dom";
import './NotFoundView.css';
import {Routes} from "../Routes";

export function NotFoundView() {
  return (
    <div className="app">
      <h1>Not found!</h1>
      <div>
        <p>The assessment test or page was not found. Please go to the <Link to={Routes.WELCOME}>main menu</Link> and select your test.</p>
      </div>
    </div>
  );
}
