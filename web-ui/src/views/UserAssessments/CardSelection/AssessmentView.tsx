import React from 'react';

import './AssessmentView.css';
import { Introduction } from './Introduction';
import { AssessmentGame } from './components/AssessmentGame';
import { useAssessmentStore } from './hooks/useAssessmentStore';

export function AssessmentView() {
  const userId = useAssessmentStore((state) => state.userId);

  let subView: React.JSX.Element | null = null;
  if (!userId) {
    subView = <Introduction />;
  } else {
    subView = <AssessmentGame />;
  }

  return (
    <div className="app">
      <h1>Card Selection Assessment</h1>
      <div>
        {subView}
      </div>
    </div>
  );
}
