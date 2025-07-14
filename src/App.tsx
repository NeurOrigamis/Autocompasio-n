import React, { useState } from 'react';
import { UserInfoForm } from './components/UserInfoForm';
import { QuestionnaireSelector } from './components/QuestionnaireSelector';
import { SelfCompassionQuestionnaire } from './components/SelfCompassionQuestionnaire';
import { DassQuestionnaire } from './components/DassQuestionnaire';
import { UserInfo, QuestionnaireType, SelfCompassionResults, DassResults } from './types';

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<QuestionnaireType>(null);
  const [selfCompassionResults, setSelfCompassionResults] = useState<SelfCompassionResults | null>(null);
  const [dassResults, setDassResults] = useState<DassResults | null>(null);

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
  };

  const handleQuestionnaireSelect = (type: QuestionnaireType) => {
    setSelectedQuestionnaire(type);
  };

  const handleBackToSelector = () => {
    setSelectedQuestionnaire(null);
  };

  const handleSelfCompassionComplete = (results: SelfCompassionResults) => {
    setSelfCompassionResults(results);
  };

  const handleDassComplete = (results: DassResults) => {
    setDassResults(results);
  };

  // Mostrar formulario de información del usuario
  if (!userInfo) {
    return <UserInfoForm onSubmit={handleUserInfoSubmit} />;
  }

  // Mostrar cuestionario de autocompasión
  if (selectedQuestionnaire === 'self-compassion') {
    return (
      <SelfCompassionQuestionnaire
        userInfo={userInfo}
        onBack={handleBackToSelector}
        onComplete={handleSelfCompassionComplete}
      />
    );
  }

  // Mostrar cuestionario DASS-21
  if (selectedQuestionnaire === 'dass-21') {
    return (
      <DassQuestionnaire
        userInfo={userInfo}
        onBack={handleBackToSelector}
        onComplete={handleDassComplete}
      />
    );
  }

  // Mostrar selector de cuestionarios
  return (
    <QuestionnaireSelector
      userInfo={userInfo}
      onSelect={handleQuestionnaireSelect}
    />
  );
}

export default App;