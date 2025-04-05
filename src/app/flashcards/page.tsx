"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { flashcardData } from "@/data/flashcardData";
import Flashcard from "@/components/Flashcard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function FlashcardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Add isClient state to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  
  // Get section from URL parameters or default to first section
  const sectionParam = searchParams.get("section");
  const initialSection = sectionParam 
    ? flashcardData.findIndex(s => s.section === sectionParam)
    : 0;
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSection >= 0 ? initialSection : 0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showSectionSelect, setShowSectionSelect] = useState(!sectionParam);
  
  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const currentSection = flashcardData[currentSectionIndex];
  
  // Update URL when section changes, but only on client
  useEffect(() => {
    if (isClient && !showSectionSelect) {
      const newUrl = `/flashcards?section=${encodeURIComponent(currentSection.section)}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);
    }
  }, [currentSectionIndex, showSectionSelect, currentSection, isClient]);
  
  // Reset card index when section changes
  useEffect(() => {
    setCurrentCardIndex(0);
  }, [currentSectionIndex]);
  
  const handleNextCard = () => {
    if (currentCardIndex < currentSection.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  
  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  const handleSelectSection = (index: number) => {
    setCurrentSectionIndex(index);
    setShowSectionSelect(false);
  };
  
  const totalCards = currentSection.cards.length;
  
  // Show loading state while client-side code initializes
  if (!isClient) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Terug naar Home
        </Button>
        
        {!showSectionSelect && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSectionSelect(true)}
            className="ml-auto"
          >
            Kies ander onderwerp
          </Button>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {showSectionSelect ? (
          <motion.div
            key="section-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kies een onderwerp</CardTitle>
                <CardDescription>
                  Selecteer een onderwerp om mee te oefenen
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-2">
                  {flashcardData.map((section, index) => (
                    <Button
                      key={section.section}
                      variant={currentSectionIndex === index ? "default" : "outline"}
                      className="justify-between h-auto py-3"
                      onClick={() => handleSelectSection(index)}
                    >
                      <span>{section.section}</span>
                      <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-gray-600 dark:text-gray-300">
                        {section.cards.length} kaarten
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  onClick={() => setShowSectionSelect(false)}
                  disabled={flashcardData.length === 0}
                  className="w-full"
                >
                  Start met {currentSection?.section}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{currentSection.section}</h1>
            </div>
            
            <Flashcard
              front={currentSection.cards[currentCardIndex].front}
              back={currentSection.cards[currentCardIndex].back}
              onNext={handleNextCard}
              onPrevious={handlePreviousCard}
              currentIndex={currentCardIndex}
              totalCards={totalCards}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 