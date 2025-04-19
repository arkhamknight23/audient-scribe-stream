
import React from 'react';
import { Button } from '@/components/ui/button';

const WelcomeScreen = ({ onRegister }: { onRegister: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F2E9] px-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-serif text-srmd-navy text-center leading-tight">
          Welcome to the
          <br />
          Divine Discourse by
          <br />
          <span className="text-srmd-burgundy">Pujya Gurudevshri</span>
        </h1>
        
        <Button 
          onClick={onRegister}
          className="w-full bg-srmd-burgundy hover:bg-srmd-burgundy/90 text-white py-6"
        >
          Register Now
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
