import React from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css';
import logo from './logo.png';
import {Routes as AppRoutes } from "./Routes";
import {WelcomeView} from "./views/WelcomeView";
import {NotFoundView} from "./views/NotFoundView";
import {AssessmentView} from "./views/UserAssessments/CardSelection/AssessmentView";

function App() {
  return (
    <div className="app">
      <img src={logo} className="app-logo" alt="logo"/>
      <Routes>
        <Route path="/">
          <Route index element={<WelcomeView/>}/>
          <Route path={AppRoutes.CARD_SELECTION} element={<AssessmentView/>}/>
          <Route path="*" element={<NotFoundView/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
