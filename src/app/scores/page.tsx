"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavHeader from "@/components/NavHeader";
import { ScoreHistory } from "@/components/ScoreHistory";
import { getQuizTypes } from "@/lib/score-utils";

export default function ScoresPage() {
  const [mounted, setMounted] = useState(false);
  const [quizTypes, setQuizTypes] = useState<string[]>([]);
  
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setQuizTypes(getQuizTypes());
    }
  }, []);
  
  if (!mounted) {
    return <div className="p-8 text-center">Laden...</div>;
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <NavHeader />
      
      <h1 className="text-3xl font-bold mb-6 dyslexic-text">Quiz Resultaten</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Alle Resultaten</TabsTrigger>
          <TabsTrigger value="quizzes">Per Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recente Resultaten</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreHistory limit={20} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizTypes.length > 0 ? (
              quizTypes.map(quizType => (
                <div key={quizType}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{quizType}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScoreHistory quizType={quizType} limit={5} />
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Nog geen quiz resultaten gevonden. Maak een quiz om je voortgang te zien!
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 