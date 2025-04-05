"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavHeader from "@/components/NavHeader";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <NavHeader />
      
      <main className="space-y-10 mt-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6 dyslexic-text">Scheikunde Leren</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 dyslexic-text">
            Welkom bij de scheikunde quiz app! Hier kun je oefenen met verschillende 
            scheikunde onderwerpen via quizzen en flashcards.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="dyslexic-card">
            <CardHeader>
              <CardTitle className="text-2xl">Quiz</CardTitle>
              <CardDescription className="text-lg">
                Test je kennis met vragen over verschillende scheikunde onderwerpen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video flex items-center justify-center relative">
                <div 
                  className="w-full h-full rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <span className="text-2xl text-primary/60">Quiz</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/quiz" className="w-full">
                <Button className="w-full text-lg p-6">
                  Start Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="dyslexic-card">
            <CardHeader>
              <CardTitle className="text-2xl">Flashcards</CardTitle>
              <CardDescription className="text-lg">
                Leer scheikunde concepten met behulp van digitale flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video flex items-center justify-center relative">
                <div 
                  className="w-full h-full rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <span className="text-2xl text-primary/60">Flashcards</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/flashcards" className="w-full">
                <Button className="w-full text-lg p-6">
                  Open Flashcards
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="dyslexic-card">
            <CardHeader>
              <CardTitle className="text-2xl">Flashcard Quiz</CardTitle>
              <CardDescription className="text-lg">
                Test je kennis van alle flashcard inhoud in quiz-formaat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video flex items-center justify-center relative">
                <div 
                  className="w-full h-full rounded-lg bg-secondary/20 flex items-center justify-center"
                >
                  <span className="text-2xl text-secondary/70">Flashcard Quiz</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/flashcard-quiz" className="w-full">
                <Button className="w-full text-lg p-6" variant="secondary">
                  Start Flashcard Quiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
} 