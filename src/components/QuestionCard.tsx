"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

type QuestionCardProps = {
  question: string;
  options: string[];
  questionId: string;
  onAnswer: (questionId: string, answer: string, isCorrect: boolean) => void;
  correctAnswer: string;
  explanation: string;
};

export default function QuestionCard({
  question,
  options,
  questionId,
  onAnswer,
  correctAnswer,
  explanation
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
  };
  
  const handleSubmit = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const isCorrect = selectedAnswer === correctAnswer;
    setIsAnswered(true);
    onAnswer(questionId, selectedAnswer, isCorrect);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="dyslexic-card">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">{question}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {options.map((option, index) => {
              const isCorrectAnswer = isAnswered && option === correctAnswer;
              const isIncorrectSelection = isAnswered && selectedAnswer === option && option !== correctAnswer;
              
              return (
                <div
                  key={`${questionId}-option-${index}`}
                  className={`
                    relative flex items-center p-5 rounded-md border-2 cursor-pointer transition-colors dyslexic-text
                    ${!isAnswered && selectedAnswer === option ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
                    ${isCorrectAnswer ? 'border-green-600 bg-green-50' : ''}
                    ${isIncorrectSelection ? 'border-red-600 bg-red-50' : ''}
                  `}
                  onClick={() => handleSelectAnswer(option)}
                >
                  <div className="flex-1">
                    <span className="text-lg leading-relaxed">{option}</span>
                  </div>
                  
                  {isCorrectAnswer && (
                    <div className="absolute right-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  )}
                  
                  {isIncorrectSelection && (
                    <div className="absolute right-4">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="mt-6 bg-blue-50 border-blue-200 border-2 p-4">
                <AlertDescription className="dyslexic-text text-lg">
                  <span className="font-bold">Uitleg: </span>{explanation}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer || isAnswered}
            className="w-full text-lg p-6"
            size="lg"
          >
            {isAnswered ? "Beantwoord" : "Controleer antwoord"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 