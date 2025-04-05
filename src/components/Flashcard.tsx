"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

type FlashcardProps = {
  front: string;
  back: string;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCards: number;
};

export default function Flashcard({
  front,
  back,
  onNext,
  onPrevious,
  currentIndex,
  totalCards
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNextCard = () => {
    setIsFlipped(false);
    onNext();
  };
  
  const handlePreviousCard = () => {
    setIsFlipped(false);
    onPrevious();
  };
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-4">
        <div className="text-sm text-gray-500">
          Kaart {currentIndex + 1} van {totalCards}
        </div>
      </div>
      
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front of the card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cursor-pointer"
          onClick={handleFlip}
        >
          <Card className="h-64 flex flex-col">
            <CardContent className="flex-1 flex items-center justify-center p-6 text-center">
              <h3 className="text-xl font-medium">{front}</h3>
            </CardContent>
            <CardFooter className="justify-center border-t p-2 text-xs text-gray-500">
              Klik om te draaien
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Back of the card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cursor-pointer"
          onClick={handleFlip}
        >
          <Card className="h-64 flex flex-col bg-blue-50">
            <CardContent className="flex-1 flex items-center justify-center p-6 text-center">
              <p>{back}</p>
            </CardContent>
            <CardFooter className="justify-center border-t p-2 text-xs text-gray-500">
              Klik om te draaien
            </CardFooter>
          </Card>
        </motion.div>
      </ReactCardFlip>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePreviousCard}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Vorige
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleFlip}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Draaien
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleNextCard}
          disabled={currentIndex === totalCards - 1}
        >
          Volgende
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 