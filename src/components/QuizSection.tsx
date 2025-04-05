"use client";

import { useState, useEffect } from "react";
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
};

export default function QuizSection({ section, description, questions, onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { answer: string; isCorrect: boolean }>>({});
  const [showSummary, setShowSummary] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  
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
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{section}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
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
            
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Vorige
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={!isCurrentQuestionAnswered}
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
          >
            <Card>
              <CardHeader>
                <CardTitle>Resultaten: {section}</CardTitle>
                <CardDescription>Je hebt dit onderdeel afgerond</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">{scorePercentage}%</div>
                  <p className="text-gray-500">
                    Je hebt {correctAnswers} van de {questions.length} vragen goed beantwoord
                  </p>
                </div>
                
                <div className="space-y-4">
                  {questions.map((q, index) => {
                    const userAnswer = answers[q.id];
                    return (
                      <div key={q.id} className="border-b pb-2 last:border-b-0">
                        <div className="flex items-start gap-2">
                          <div className={`mt-1 rounded-full w-6 h-6 flex items-center justify-center text-xs ${userAnswer?.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{q.question}</p>
                            <p className="text-sm mt-1">
                              <span className="text-gray-500">Jouw antwoord: </span>
                              <span className={userAnswer?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                                {userAnswer?.answer}
                              </span>
                            </p>
                            {!userAnswer?.isCorrect && (
                              <p className="text-sm mt-1">
                                <span className="text-gray-500">Juiste antwoord: </span>
                                <span className="text-green-600">{q.answer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button onClick={handleCompleteSection} className="w-full">
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