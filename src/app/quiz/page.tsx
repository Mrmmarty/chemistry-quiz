"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { quizData } from "@/data/quizData";
import QuizSection from "@/components/QuizSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import NavHeader from "@/components/NavHeader";
import { saveQuizScore } from "@/lib/score-utils";
import { ScoreHistory } from "@/components/ScoreHistory";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

type SectionResult = {
  sectionName: string;
  score: number;
  total: number;
};

export default function QuizPage() {
  const router = useRouter();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionResults, setSectionResults] = useState<SectionResult[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  // Using separate state for client-side rendering detection
  const [isClient, setIsClient] = useState(false);
  // Add state for tracking question-level progress
  const [sectionProgress, setSectionProgress] = useState<Record<string, {
    currentQuestionIndex: number;
    answers: Record<string, { answer: string; isCorrect: boolean }>;
  }>>({});
  
  // Add a state to track if the current quiz was already saved
  const [scoresSaved, setScoresSaved] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: "", content: "" });
  
  // Set isClient to true once the component mounts
  useEffect(() => {
    setIsClient(true);
    
    // Check if we have saved progress in localStorage
    const savedProgress = localStorage.getItem("quizProgress");
    
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setSectionResults(progress.sectionResults || []);
        setCurrentSectionIndex(progress.currentSectionIndex || 0);
        // Load question-level progress if available
        if (progress.sectionProgress) {
          setSectionProgress(progress.sectionProgress);
        }
      } catch (e) {
        console.error("Failed to parse saved progress", e);
      }
    }
  }, []);
  
  // Debounced save to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      if (isClient) {
        localStorage.setItem("quizProgress", JSON.stringify({
          sectionResults,
          currentSectionIndex,
          sectionProgress
        }));
      }
    }, 500);
  }, [sectionResults, currentSectionIndex, sectionProgress, isClient]);
  
  // Save progress to localStorage when state changes
  useEffect(() => {
    saveToLocalStorage();
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [saveToLocalStorage]);
  
  // Save scores when quiz is completed
  useEffect(() => {
    if (showFinalResults && !scoresSaved) {
      const totalCorrect = sectionResults.reduce((sum, section) => sum + section.score, 0);
      const totalQuestions = sectionResults.reduce((sum, section) => sum + section.total, 0);
      
      // Save overall quiz result
      saveQuizScore('Volledige Quiz', totalCorrect, totalQuestions);
      
      // Save each section result separately
      sectionResults.forEach(section => {
        saveQuizScore(section.sectionName, section.score, section.total);
      });
      
      setScoresSaved(true);
    }
  }, [showFinalResults, sectionResults, scoresSaved]);
  
  const handleSectionComplete = (result: SectionResult) => {
    const newResults = [...sectionResults];
    
    // Update or add the result
    const existingIndex = newResults.findIndex(r => r.sectionName === result.sectionName);
    
    if (existingIndex >= 0) {
      newResults[existingIndex] = result;
    } else {
      newResults.push(result);
    }
    
    setSectionResults(newResults);
    
    // Clear the progress for this section since it's complete
    const newSectionProgress = { ...sectionProgress };
    if (currentSection) {
      delete newSectionProgress[currentSection.title];
      setSectionProgress(newSectionProgress);
    }
    
    // Move to next section or show results if all sections are completed
    if (currentSectionIndex < quizData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setShowFinalResults(true);
    }
  };
  
  const handleRestartQuiz = () => {
    localStorage.removeItem("quizProgress");
    setSectionResults([]);
    setCurrentSectionIndex(0);
    setSectionProgress({});
    setShowFinalResults(false);
    setScoresSaved(false);
  };
  
  // Track question progress within a section - use useCallback to avoid recreating on every render
  const handleQuestionProgress = useCallback((
    sectionName: string, 
    currentQuestionIndex: number, 
    answers: Record<string, { answer: string; isCorrect: boolean }>
  ) => {
    setSectionProgress(prev => {
      const newProgress = {
        ...prev,
        [sectionName]: {
          currentQuestionIndex,
          answers
        }
      };
      return newProgress;
    });
  }, []);
  
  // Calculate overall score
  const totalScore = sectionResults.reduce((sum, result) => sum + result.score, 0);
  const totalQuestions = sectionResults.reduce((sum, result) => sum + result.total, 0);
  const overallPercentage = totalQuestions > 0 
    ? Math.round((totalScore / totalQuestions) * 100) 
    : 0;
  
  // Calculate progress through the quiz
  const quizProgress = ((sectionResults.length) / quizData.sections.length) * 100;
  
  const currentSection = quizData.sections[currentSectionIndex];
  
  // Get saved progress for current section
  const currentSectionProgress = currentSection ? sectionProgress[currentSection.title] : undefined;
  
  // Open info modal with explanation
  const openInfoModal = (title: string, content: string) => {
    setInfoModalContent({
      title,
      content
    });
    setInfoModalOpen(true);
  };
  
  // Handle section question answered
  const handleSectionQuestionAnswered = (
    sectionId: string,
    questionIndex: number,
    isCorrect: boolean,
    selectedAnswer: string
  ) => {
    // Update the answers
    const newAnswers = { ...sectionProgress };
    if (!newAnswers[sectionId]) {
      newAnswers[sectionId] = [];
    }
    
    newAnswers[sectionId][questionIndex] = {
      correct: isCorrect,
      answer: selectedAnswer,
    };
    
    setSectionProgress(newAnswers);
    localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
    
    // Auto-advance to next question if correct (with delay)
    if (isCorrect) {
      const activeSection = quizData.sections.find((s) => s.id === sectionId);
      if (activeSection && currentSectionProgress && currentSectionProgress.currentQuestionIndex < activeSection.questions.length - 1) {
        setTimeout(() => {
          // If not the last question in section, go to next question
          handleQuestionProgress(activeSection.title, currentSectionProgress.currentQuestionIndex + 1, newAnswers[activeSection.title] || {});
        }, 800);
      }
    }
  };
  
  // Only show loading state on the client side before data is loaded
  if (!isClient) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <NavHeader />
      
      {!showFinalResults ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Scheikunde Quiz</h1>
            <div className="flex items-center gap-4">
              <Progress value={quizProgress} className="h-2 flex-1" />
              <span className="text-sm text-gray-500 min-w-16 text-right">
                {Math.round(quizProgress)}%
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Sectie {currentSectionIndex + 1} van {quizData.sections.length}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizSection 
                section={currentSection.title}
                description={currentSection.description}
                questions={currentSection.questions}
                onComplete={handleSectionComplete}
                initialProgress={currentSectionProgress}
                onProgressUpdate={(currentQuestionIndex, answers) => 
                  handleQuestionProgress(currentSection.title, currentQuestionIndex, answers)
                }
              />
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz Resultaten</CardTitle>
              <CardDescription>
                Je hebt alle secties van de quiz voltooid!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{overallPercentage}%</div>
                <p className="text-gray-500">
                  Je hebt in totaal {totalScore} van de {totalQuestions} vragen goed beantwoord
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Resultaten per sectie:</h3>
                {sectionResults.map((result) => {
                  const percentage = Math.round((result.score / result.total) * 100);
                  return (
                    <div key={result.sectionName} className="flex items-center">
                      <div className="flex-1 font-medium">{result.sectionName}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              percentage >= 80 ? 'bg-green-500' : 
                              percentage >= 60 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-sm">
                          {result.score}/{result.total} ({percentage}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-4 flex-wrap">
              <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
                Start Opnieuw
              </Button>
              <Button onClick={() => router.push('/')} className="flex-1">
                Terug naar Home
              </Button>
            </CardFooter>
          </Card>
          
          {/* Display score history */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Eerdere Resultaten</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreHistory quizType="Volledige Quiz" limit={5} />
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Information Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{infoModalContent.title}</DialogTitle>
            <DialogDescription>
              {infoModalContent.content}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
} 