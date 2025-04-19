
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LandingPage = ({ onContinue }: { onContinue: () => void }) => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || hasTriggered) return;
      
      // Calculate how far down the user has scrolled as a percentage of page height
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Pixels to scroll before triggering
      
      if (scrollPosition > scrollThreshold) {
        setHasTriggered(true);
        onContinue();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onContinue, hasTriggered]);

  return (
    <div 
      ref={scrollRef}
      className="min-h-[150vh] flex flex-col items-center justify-start bg-[#F5F2E9] px-4"
    >
      <div className="w-24 h-24 mt-16">
        <img 
          src="/lovable-uploads/5252f1e6-7393-4256-a41f-47cbedcd10d2.png" 
          alt="SRMD Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="mt-40 text-center">
        <p className="text-srmd-navy/80 font-medium">Scroll Down to Continue</p>
        <ChevronDown className="w-6 h-6 mx-auto mt-2 text-srmd-navy/60 animate-bounce" />
      </div>

      {/* Add extra content to ensure there's room to scroll */}
      <div className="h-[50vh]"></div>
    </div>
  );
};

export default LandingPage;
