"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";

type QuestionCardProps = {
  question: string;
  options: string[];
  questionId: string;
  onAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  correctAnswer: string;
  explanation: string;
  onNext?: () => void;
};

export default function QuestionCard({
  question,
  options,
  questionId,
  onAnswer,
  correctAnswer,
  explanation,
  onNext
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  
  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    
    // Immediately process the answer
    const isCorrect = answer === correctAnswer;
    setIsAnswered(true);
    onAnswer(questionId, answer, isCorrect);
    
    if (isCorrect) {
      // If correct, wait a moment to show feedback then go to next question
      setTimeout(() => {
        if (onNext) onNext();
      }, 1000);
    } else {
      // If wrong, show explanation modal
      setTimeout(() => {
        setShowExplanationModal(true);
      }, 500);
    }
  };
  
  // Close explanation modal and go next
  const handleCloseExplanation = () => {
    setShowExplanationModal(false);
    if (onNext) onNext();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="dyslexic-card">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-lg sm:text-xl leading-relaxed">{question}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
          <div className="space-y-2 sm:space-y-4">
            {options.map((option, index) => {
              const isCorrectAnswer = isAnswered && option === correctAnswer;
              const isIncorrectSelection = isAnswered && selectedAnswer === option && option !== correctAnswer;
              
              return (
                <div
                  key={`${questionId}-option-${index}`}
                  className={`
                    relative flex items-center p-3 sm:p-5 rounded-md border-2 cursor-pointer transition-colors dyslexic-text
                    ${!isAnswered && selectedAnswer === option ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
                    ${isCorrectAnswer ? 'border-green-600 bg-green-50' : ''}
                    ${isIncorrectSelection ? 'border-red-600 bg-red-50' : ''}
                  `}
                  onClick={() => handleSelectAnswer(option)}
                >
                  <div className="flex-1">
                    <span className="text-base sm:text-lg leading-relaxed">{option}</span>
                  </div>
                  
                  {isCorrectAnswer && (
                    <div className="absolute right-3 sm:right-4">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                  )}
                  
                  {isIncorrectSelection && (
                    <div className="absolute right-3 sm:right-4">
                      <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Explanation Modal for Incorrect Answers */}
      <Dialog open={showExplanationModal} onOpenChange={setShowExplanationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Helaas, dat was niet juist</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-base">
              <span className="font-bold">Juiste antwoord: </span>
              <span className="text-green-600">{correctAnswer}</span>
            </p>
            <p className="dyslexic-text text-sm sm:text-base">
              <span className="font-bold">Uitleg: </span>{explanation}
            </p>
          </div>
          
          <DialogFooter>
            <Button onClick={handleCloseExplanation} className="w-full">
              Naar volgende vraag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
} 