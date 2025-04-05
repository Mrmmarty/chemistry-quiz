"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getAllScores, getQuizTypes, Quiz } from '@/lib/score-utils';

interface QuizStats {
  average: number;
  best: number;
  count: number;
}

export function ProgressOverview() {
  const [mounted, setMounted] = useState(false);
  const [quizTypes, setQuizTypes] = useState<string[]>([]);
  const [quizStats, setQuizStats] = useState<Record<string, QuizStats>>({});
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      // Get quiz types
      const types = getQuizTypes();
      setQuizTypes(types);
      
      // Get all scores
      const allScores = getAllScores();
      setTotalQuizzes(allScores.length);
      
      // Calculate average score per quiz type
      const scoresByType: Record<string, Quiz[]> = {};
      types.forEach(type => {
        scoresByType[type] = allScores.filter(score => score.type === type);
      });
      
      // Calculate stats
      const stats: Record<string, QuizStats> = {};
      types.forEach(type => {
        const scores = scoresByType[type];
        if (scores.length > 0) {
          const sum = scores.reduce((total, score) => total + score.percentage, 0);
          const average = Math.round(sum / scores.length);
          const best = Math.max(...scores.map(score => score.percentage));
          stats[type] = {
            average,
            best,
            count: scores.length
          };
        } else {
          stats[type] = {
            average: 0,
            best: 0,
            count: 0
          };
        }
      });
      
      setQuizStats(stats);
    }
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  if (totalQuizzes === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voortgang</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">
            Nog geen quiz resultaten. Maak een quiz om je voortgang te zien!
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voortgang Overzicht</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground mb-2">
          Totaal aantal gemaakte quizzes: {totalQuizzes}
        </div>
        
        {quizTypes.map(type => {
          const stats = quizStats[type] || { average: 0, best: 0, count: 0 };
          return (
            <div key={type} className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{type}</h3>
                  <p className="text-xs text-muted-foreground">
                    {stats.count} keer gemaakt
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{stats.average}%</div>
                  <p className="text-xs text-muted-foreground">
                    Beste: {stats.best}%
                  </p>
                </div>
              </div>
              <Progress 
                value={stats.average} 
                className="h-2"
                indicatorClassName={
                  stats.average >= 80 ? "bg-green-500" : 
                  stats.average >= 60 ? "bg-yellow-500" : 
                  "bg-red-500"
                }
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
} 