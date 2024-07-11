import React from 'react';
import {Route, Routes} from "react-router-dom";

import logo from './logo.png';
import './App.css';
import {Routes as AppRoutes } from "./Routes";
import {WelcomeView} from "./views/WelcomeView";
import {NotFoundView} from "./views/NotFoundView";
import {AssessmentView} from "./views/UserAssessments/CardSelection/AssessmentView";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo"/>
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
