"use client";

import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { formatDatetime } from '@/lib/score-utils'
import { Quiz } from '@/lib/score-utils'

interface ScoreHistoryProps {
  quizType?: string;
  limit?: number;
}

export function ScoreHistory({ quizType, limit = 5 }: ScoreHistoryProps) {
  const [scores, setScores] = useState<Quiz[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loadScores = () => {
      try {
        const savedScores = localStorage.getItem('quizScores')
        if (savedScores) {
          let parsedScores = JSON.parse(savedScores) as Quiz[]
          
          // Filter by quiz type if specified
          if (quizType) {
            parsedScores = parsedScores.filter(score => score.type === quizType)
          }
          
          // Sort by date, newest first
          parsedScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          
          // Limit the number of scores shown
          setScores(parsedScores.slice(0, limit))
        }
      } catch (error) {
        console.error('Error loading scores:', error)
      }
    }
    
    loadScores()
  }, [quizType, limit])

  if (!mounted) {
    return null
  }

  if (scores.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Geen quiz resultaten gevonden.
      </div>
    )
  }

  return (
    <Table>
      <TableCaption>
        {quizType 
          ? `Laatste ${Math.min(scores.length, limit)} ${quizType} resultaten` 
          : `Laatste ${Math.min(scores.length, limit)} quiz resultaten`}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Datum</TableHead>
          <TableHead>Quiz Type</TableHead>
          <TableHead className="text-right">Score</TableHead>
          <TableHead className="text-right">Correcte Antwoorden</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((score, index) => (
          <TableRow key={index}>
            <TableCell>{formatDatetime(score.date)}</TableCell>
            <TableCell>{score.type}</TableCell>
            <TableCell className="text-right">{score.percentage}%</TableCell>
            <TableCell className="text-right">{score.correct}/{score.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 