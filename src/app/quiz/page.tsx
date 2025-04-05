"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { quizData } from "@/data/quizData";
import QuizSection from "@/components/QuizSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type SectionResult = {
  sectionName: string;
  score: number;
  total: number;
};

export default function QuizPage() {
  const router = useRouter();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionResults, setSectionResults] = useState<SectionResult[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  // Using separate state for client-side rendering detection
  const [isClient, setIsClient] = useState(false);
  
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
      } catch (e) {
        console.error("Failed to parse saved progress", e);
      }
    }
  }, []);
  
  // Save progress to localStorage whenever section results or current section changes
  useEffect(() => {
    if (isClient && sectionResults.length > 0) {
      localStorage.setItem("quizProgress", JSON.stringify({
        sectionResults,
        currentSectionIndex
      }));
    }
  }, [sectionResults, currentSectionIndex, isClient]);
  
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
    
    // Move to next section or show results if all sections are completed
    if (currentSectionIndex < quizData.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setShowFinalResults(true);
    }
  };
  
  const handleRestartQuiz = () => {
    localStorage.removeItem("quizProgress");
    setSectionResults([]);
    setCurrentSectionIndex(0);
    setShowFinalResults(false);
  };
  
  // Calculate overall score
  const totalScore = sectionResults.reduce((sum, result) => sum + result.score, 0);
  const totalQuestions = sectionResults.reduce((sum, result) => sum + result.total, 0);
  const overallPercentage = totalQuestions > 0 
    ? Math.round((totalScore / totalQuestions) * 100) 
    : 0;
  
  // Calculate progress through the quiz
  const quizProgress = ((sectionResults.length) / quizData.length) * 100;
  
  const currentSection = quizData[currentSectionIndex];
  
  // Only show loading state on the client side before data is loaded
  if (!isClient) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
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
              Sectie {currentSectionIndex + 1} van {quizData.length}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.section}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizSection 
                section={currentSection.section}
                description={currentSection.description}
                questions={currentSection.questions}
                onComplete={handleSectionComplete}
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
          <Card>
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
        </motion.div>
      )}
    </div>
  );
} 