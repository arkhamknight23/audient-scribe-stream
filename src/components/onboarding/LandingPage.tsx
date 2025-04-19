
import React from 'react';
import { ChevronDown } from 'lucide-react';

const LandingPage = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F2E9] px-4">
      <div className="w-24 h-24 mb-auto mt-16">
        <img 
          src="/lovable-uploads/5252f1e6-7393-4256-a41f-47cbedcd10d2.png" 
          alt="SRMD Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="mt-auto mb-16 text-center">
        <p className="text-srmd-navy/80 font-medium">Scroll Down to Continue</p>
        <ChevronDown className="w-6 h-6 mx-auto mt-2 text-srmd-navy/60 animate-bounce" />
      </div>
    </div>
  );
};

export default LandingPage;
