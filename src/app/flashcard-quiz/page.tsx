"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import NavHeader from "@/components/NavHeader";
import { flashcardData } from "@/data/flashcardData";
import QuestionCard from "@/components/QuestionCard";
import { saveQuizScore } from "@/lib/score-utils";
import { ScoreHistory } from "@/components/ScoreHistory";

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Convert flashcards to quiz questions
const createQuestionsFromFlashcards = () => {
  const allQuestions = [];
  
  for (const section of flashcardData.sections) {
    for (const card of section.cards) {
      // Create a question from each flashcard
      const question = {
        id: card.id,
        question: card.front,
        answer: card.back,
        options: [] as string[], // Will be populated with the correct answer and random others
        explanation: `${section.title}: ${card.back}`,
      };
      
      // Get some random incorrect options from other cards in the same section
      const otherCardsInSection = section.cards.filter(c => c.id !== card.id);
      const potentialWrongAnswers = shuffleArray(otherCardsInSection).slice(0, 3).map(c => c.back);
      
      // Combine correct answer with wrong ones and shuffle
      question.options = shuffleArray([card.back, ...potentialWrongAnswers]);
      
      allQuestions.push(question);
    }
  }
  
  // Shuffle the questions so they're not grouped by section
  return shuffleArray(allQuestions);
};

export default function FlashcardQuizPage() {
  const router = useRouter();
  const initializedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { answer: string; isCorrect: boolean }>>({});
  const [showResults, setShowResults] = useState(false);
  const [scoresSaved, setScoresSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Initialize on first mount only
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    
    // Generate questions
    const generatedQuestions = createQuestionsFromFlashcards();
    setQuestions(generatedQuestions);
    
    // Try to load saved progress
    try {
      const savedProgress = localStorage.getItem("flashcardQuizProgress");
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress.answers) setAnswers(progress.answers);
        if (typeof progress.currentQuestionIndex === 'number') {
          setCurrentQuestionIndex(progress.currentQuestionIndex);
        }
        if (typeof progress.showResults === 'boolean') {
          setShowResults(progress.showResults);
        }
      }
    } catch (error) {
      console.error("Failed to parse saved progress", error);
    }
    
    setMounted(true);
  }, []);
  
  // Save scores when quiz is completed
  useEffect(() => {
    if (showResults && !scoresSaved) {
      const correct = Object.values(answers).filter(a => a.isCorrect).length;
      const total = questions.length;
      
      // Save flashcard quiz result
      saveQuizScore('Flashcard Quiz', correct, total);
      setScoresSaved(true);
    }
  }, [showResults, scoresSaved, answers, questions.length]);
  
  // Reset quiz progress
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setProgress(0);
    setShowResults(false);
    setScoresSaved(false);
    localStorage.removeItem("flashcardQuizProgress");
  };
  
  // Handle answering a question
  const handleAnswer = (questionId: string, answer: string, isCorrect: boolean) => {
    const newAnswers = {
      ...answers,
      [questionId]: { answer, isCorrect }
    };
    setAnswers(newAnswers);
    
    // Save progress after user answers
    setTimeout(() => {
      localStorage.setItem("flashcardQuizProgress", JSON.stringify({
        currentQuestionIndex,
        answers: newAnswers,
        showResults
      }));
    }, 0);
  };
  
  // Move to next question or show results if finished
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      
      // Save after navigation
      setTimeout(() => {
        localStorage.setItem("flashcardQuizProgress", JSON.stringify({
          currentQuestionIndex: newIndex,
          answers,
          showResults
        }));
      }, 0);
    } else {
      setShowResults(true);
      
      // Save after showing results
      setTimeout(() => {
        localStorage.setItem("flashcardQuizProgress", JSON.stringify({
          currentQuestionIndex,
          answers,
          showResults: true
        }));
      }, 0);
    }
  };
  
  // Move to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      
      // Save after navigation
      setTimeout(() => {
        localStorage.setItem("flashcardQuizProgress", JSON.stringify({
          currentQuestionIndex: newIndex,
          answers,
          showResults
        }));
      }, 0);
    }
  };
  
  // Loading state
  if (!mounted || questions.length === 0) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  // Calculate quiz progress
  setProgress(questions.length ? ((Object.keys(answers).length) / questions.length) * 100 : 0);
  
  // Calculate final score
  const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
  const scorePercentage = questions.length ? Math.round((correctAnswers / questions.length) * 100) : 0;
  
  const currentQuestion = questions[currentQuestionIndex];
  // Check if current question is answered to enable Next button
  const isCurrentQuestionAnswered = currentQuestion && answers[currentQuestion.id];
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <NavHeader />
      
      {!showResults ? (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Flashcard Quiz</h1>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-sm text-gray-500 min-w-16 text-right">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Vraag {currentQuestionIndex + 1} van {questions.length}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
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
                  onClick={handlePreviousQuestion}
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
                Je hebt alle vragen van de flashcard quiz beantwoord!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{scorePercentage}%</div>
                <p className="text-gray-500">
                  Je hebt {correctAnswers} van de {questions.length} vragen goed beantwoord
                </p>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <h3 className="font-medium">Jouw antwoorden:</h3>
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
              <ScoreHistory quizType="Flashcard Quiz" limit={5} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 