"use client";

import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface FlashcardProps {
  front: string;
  back: string;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCards: number;
}

// Helper function to extract concept and examples from text
const extractVisualElements = (text: string) => {
  // Format text with better line breaks and spacing
  const formattedText = text
    .replace(/\n/g, "<br />")
    .replace(/(\d+\.\s)/g, "<br />$1")
    .replace(/(Voorbeeld:)/g, "<br /><strong>$1</strong>");
  
  return { formattedText };
};

export function Flashcard({ front, back, onNext, onPrevious, currentIndex, totalCards }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(1); // 0: small, 1: medium, 2: large
  
  const { formattedText: formattedBack } = extractVisualElements(back);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };
  
  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious();
  };
  
  const increaseFontSize = () => {
    setFontSizeLevel(prev => Math.min(prev + 1, 2));
  };
  
  const decreaseFontSize = () => {
    setFontSizeLevel(prev => Math.max(prev - 1, 0));
  };
  
  const fontSizeClass = {
    0: "text-base",
    1: "text-xl",
    2: "text-2xl"
  }[fontSizeLevel];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`card-${currentIndex}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
            className="px-3"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="sr-only">Previous</span>
          </Button>
          <span className="text-lg font-medium dyslexic-text">
            {currentIndex + 1} / {totalCards}
          </span>
          <Button 
            variant="outline" 
            onClick={handleNext} 
            disabled={currentIndex === totalCards - 1}
            className="px-3"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerClassName="flip-transition h-full">
          <Card 
            className="w-full min-h-[400px] shadow-lg cursor-pointer dyslexic-card"
            onClick={handleFlip}
          >
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="flashcard-title text-center mb-6">Vraag</h3>
                  <p className="flashcard-content">{front}</p>
                </div>
              </div>
              <div className="text-center mt-4 text-muted-foreground">
                <p className="dyslexic-text">Klik om het antwoord te zien</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="w-full min-h-[400px] shadow-lg cursor-pointer dyslexic-card bg-primary/5"
            onClick={handleFlip}
          >
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="flashcard-title text-center mb-6">Antwoord</h3>
                  <p className="flashcard-content" dangerouslySetInnerHTML={{ __html: formattedBack }}></p>
                </div>
              </div>
              <div className="text-center mt-4 text-muted-foreground">
                <p className="dyslexic-text">Klik om de vraag te zien</p>
              </div>
            </CardContent>
          </Card>
        </ReactCardFlip>
        
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={handleFlip}
            className="flex items-center gap-2"
          >
            <RotateCw className="h-4 w-4" />
            <span>Draai kaart</span>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 