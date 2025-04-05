"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import QuestionCard from "./QuestionCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type QuizSectionProps = {
  section: string;
  description: string;
  questions: Question[];
  onComplete: (sectionResults: { sectionName: string; score: number; total: number }) => void;
  initialProgress?: {
    currentQuestionIndex: number;
    answers: Record<string, { answer: string; isCorrect: boolean }>;
  };
  onProgressUpdate?: (
    currentQuestionIndex: number, 
    answers: Record<string, { answer: string; isCorrect: boolean }>
  ) => void;
};

export default function QuizSection({ 
  section, 
  description, 
  questions, 
  onComplete, 
  initialProgress,
  onProgressUpdate 
}: QuizSectionProps) {
  const isInitialized = useRef(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialProgress?.currentQuestionIndex || 0
  );
  const [answers, setAnswers] = useState<Record<string, { answer: string; isCorrect: boolean }>>(
    initialProgress?.answers || {}
  );
  const [showSummary, setShowSummary] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  
  // Notify parent component about progress updates, but only after the component is fully mounted
  // and when the user makes changes
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    
    // Use a debounced callback to avoid too frequent updates
    const timer = setTimeout(() => {
      if (onProgressUpdate) {
        onProgressUpdate(currentQuestionIndex, answers);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, answers, onProgressUpdate]);
  
  const handleAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (Object.keys(answers).length === questions.length) {
      setShowSummary(true);
    }
  };
  
  const handleCompleteSection = () => {
    const score = Object.values(answers).filter(a => a.isCorrect).length;
    onComplete({
      sectionName: section,
      score,
      total: questions.length
    });
  };
  
  // Check if current question is answered to enable Next button
  const isCurrentQuestionAnswered = currentQuestion && answers[currentQuestion.id];
  
  // Calculate section score
  const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-6 dyslexic-card">
        <CardHeader>
          <CardTitle className="text-2xl">{section}</CardTitle>
          <CardDescription className="text-lg dyslexic-text">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-3 text-md dyslexic-text">
              <span>Vraag {currentQuestionIndex + 1} van {questions.length}</span>
              <span>{Math.round(progress)}% voltooid</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              questionId={currentQuestion.id}
              correctAnswer={currentQuestion.answer}
              explanation={currentQuestion.explanation}
              onAnswer={handleAnswer}
            />
            
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="text-lg p-6"
                size="lg"
              >
                Vorige
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={!isCurrentQuestionAnswered}
                className="text-lg p-6"
                size="lg"
              >
                {currentQuestionIndex < questions.length - 1 ? "Volgende" : "Toon resultaten"}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dyslexic-card">
              <CardHeader>
                <CardTitle className="text-2xl">Resultaten: {section}</CardTitle>
                <CardDescription className="text-lg dyslexic-text">Je hebt dit onderdeel afgerond</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold mb-4">{scorePercentage}%</div>
                  <p className="text-xl dyslexic-text">
                    Je hebt {correctAnswers} van de {questions.length} vragen goed beantwoord
                  </p>
                </div>
                
                <div className="space-y-6">
                  {questions.map((q, index) => {
                    const userAnswer = answers[q.id];
                    return (
                      <div key={q.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold ${userAnswer?.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-lg dyslexic-text">{q.question}</p>
                            <p className="text-md mt-2 dyslexic-text">
                              <span className="text-gray-500">Jouw antwoord: </span>
                              <span className={userAnswer?.isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {userAnswer?.answer}
                              </span>
                            </p>
                            {!userAnswer?.isCorrect && (
                              <p className="text-md mt-2 dyslexic-text">
                                <span className="text-gray-500">Juiste antwoord: </span>
                                <span className="text-green-600 font-medium">{q.answer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              
              <CardFooter className="pt-4">
                <Button onClick={handleCompleteSection} className="w-full text-lg p-6" size="lg">
                  Ga naar de volgende sectie
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 