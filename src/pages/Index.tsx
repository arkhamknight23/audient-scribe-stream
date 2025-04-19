
import React, { useState } from 'react';
import TranslationScreen from "@/components/TranslationScreen";
import LandingPage from '@/components/onboarding/LandingPage';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import RegistrationForm from '@/components/onboarding/RegistrationForm';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'welcome' | 'register' | 'translation'>('landing');

  const handleContinue = () => {
    switch (currentStep) {
      case 'landing':
        setCurrentStep('welcome');
        break;
      case 'welcome':
        setCurrentStep('register');
        break;
      case 'register':
        setCurrentStep('translation');
        break;
    }
  };

  return (
    <div className="h-[100dvh] overflow-hidden">
      {currentStep === 'landing' && <LandingPage onContinue={handleContinue} />}
      {currentStep === 'welcome' && <WelcomeScreen onRegister={handleContinue} />}
      {currentStep === 'register' && <RegistrationForm onSubmit={handleContinue} />}
      {currentStep === 'translation' && <TranslationScreen />}
    </div>
  );
};

export default Index;
