
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegistrationForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2E9] px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/5252f1e6-7393-4256-a41f-47cbedcd10d2.png" 
            alt="SRMD Logo" 
            className="w-16 h-16 object-contain mx-auto"
          />
          <h1 className="text-3xl font-serif text-srmd-navy text-center">
            The Translation That
            <br />
            Transform & Transcends
          </h1>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl text-srmd-navy">Enter Your Details <span className="text-red-500">*</span></h2>
            
            <Input 
              placeholder="Full Name"
              required
              className="bg-transparent border-b border-srmd-navy/20 rounded-none px-0 focus-visible:ring-0"
            />
            
            <div className="flex gap-3">
              <Select defaultValue="+91">
                <SelectTrigger className="w-24 bg-transparent border-b border-srmd-navy/20 rounded-none px-0">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">+91</SelectItem>
                  <SelectItem value="+1">+1</SelectItem>
                </SelectContent>
              </Select>
              
              <Input 
                placeholder="Mobile Number"
                type="tel"
                required
                className="flex-1 bg-transparent border-b border-srmd-navy/20 rounded-none px-0 focus-visible:ring-0"
              />
            </div>
            
            <Input 
              placeholder="Email ID"
              type="email"
              required
              className="bg-transparent border-b border-srmd-navy/20 rounded-none px-0 focus-visible:ring-0"
            />
            
            <Select>
              <SelectTrigger className="bg-transparent border-b border-srmd-navy/20 rounded-none px-0">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl text-srmd-navy">Select Language <span className="text-red-500">*</span></h2>
            <Select defaultValue="spanish">
              <SelectTrigger className="bg-transparent border-b border-srmd-navy/20 rounded-none px-0">
                <SelectValue>
                  <div className="flex items-center">
                    <span className="mr-2">🇪🇸</span>
                    <span>Spanish</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spanish">
                  <div className="flex items-center">
                    <span className="mr-2">🇪🇸</span>
                    <span>Spanish</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full bg-srmd-burgundy hover:bg-srmd-burgundy/90 text-white py-6 mt-8"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
