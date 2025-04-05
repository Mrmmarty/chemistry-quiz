"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/components/Flashcard";
import { flashcardData } from "@/data/flashcardData";
import NavHeader from "@/components/NavHeader";

export default function FlashcardsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get section ID from URL params or default to showing section selection
  const initialSectionParam = searchParams.get("section");
  const [selectedSection, setSelectedSection] = useState<string | null>(initialSectionParam);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // After component mounts on client, load any saved progress
  useEffect(() => {
    setIsClient(true);
    
    // If URL already has a section parameter, use that instead of localStorage
    if (initialSectionParam) {
      return;
    }
    
    // Check for saved progress in localStorage
    const savedProgress = localStorage.getItem("flashcardsProgress");
    if (savedProgress) {
      try {
        const { sectionId, cardIndex } = JSON.parse(savedProgress);
        if (sectionId) {
          setSelectedSection(sectionId);
          if (typeof cardIndex === 'number' && cardIndex >= 0) {
            setCurrentCardIndex(cardIndex);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved flashcards progress", e);
      }
    }
  }, [initialSectionParam]);
  
  // Save progress to localStorage when section or card index changes
  useEffect(() => {
    if (isClient && selectedSection) {
      localStorage.setItem("flashcardsProgress", JSON.stringify({
        sectionId: selectedSection,
        cardIndex: currentCardIndex
      }));
    }
  }, [selectedSection, currentCardIndex, isClient]);
  
  // Update URL when section changes
  useEffect(() => {
    if (selectedSection) {
      router.push(`/flashcards?section=${selectedSection}`);
    } else {
      router.push("/flashcards");
      // Clear saved progress when returning to section selection
      if (isClient) {
        localStorage.removeItem("flashcardsProgress");
      }
    }
  }, [selectedSection, router, isClient]);
  
  // Handle next card
  const handleNextCard = () => {
    if (!selectedSection) return;
    
    const section = flashcardData.sections.find(s => s.id === selectedSection);
    if (!section) return;
    
    if (currentCardIndex < section.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Loop back to the first card when reaching the end
      setCurrentCardIndex(0);
    }
  };
  
  // Handle previous card
  const handlePreviousCard = () => {
    if (!selectedSection) return;
    
    const section = flashcardData.sections.find(s => s.id === selectedSection);
    if (!section) return;
    
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      // Loop to the last card when at the first card
      setCurrentCardIndex(section.cards.length - 1);
    }
  };
  
  // Back to section selection
  const handleBackToSections = () => {
    setSelectedSection(null);
    setCurrentCardIndex(0);
  };
  
  // If still loading on the client side, show a loading state
  if (!isClient) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  // If no section is selected, show the section selection screen
  if (!selectedSection) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <NavHeader />
        
        <Card className="mb-6 dyslexic-card">
          <CardHeader>
            <CardTitle className="text-2xl dyslexic-text">Scheikunde Flashcards</CardTitle>
            <CardDescription className="text-lg dyslexic-text">
              Kies een onderwerp om te bestuderen met flashcards
            </CardDescription>
          </CardHeader>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {flashcardData.sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <Card 
                className="w-full cursor-pointer dyslexic-card hover:shadow-lg transition-shadow duration-300"
                onClick={() => setSelectedSection(section.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-md dyslexic-text">
                    {section.cards.length} kaarten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="dyslexic-text text-lg">{section.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg p-5"
                    size="lg"
                    onClick={() => setSelectedSection(section.id)}
                  >
                    Bekijk Flashcards
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  
  // Show the selected section's flashcards
  const section = flashcardData.sections.find(s => s.id === selectedSection);
  if (!section) return <div>Sectie niet gevonden</div>;
  
  const currentCard = section.cards[currentCardIndex];
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <NavHeader />
      
      <Card className="mb-6 dyslexic-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl dyslexic-text">{section.title}</CardTitle>
              <CardDescription className="text-lg dyslexic-text">
                {currentCardIndex + 1} van {section.cards.length} kaarten
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToSections}
              className="text-lg"
            >
              Alle Secties
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <AnimatePresence mode="wait">
        <Flashcard
          key={`${section.id}-${currentCardIndex}`}
          front={currentCard.front}
          back={currentCard.back}
          onNext={handleNextCard}
          onPrevious={handlePreviousCard}
          currentIndex={currentCardIndex}
          totalCards={section.cards.length}
        />
      </AnimatePresence>
      
      <div className="mt-8 text-center dyslexic-text">
        <p className="text-lg">
          Druk op de kaart om hem om te draaien en het antwoord te zien.
        </p>
      </div>
    </div>
  );
} 