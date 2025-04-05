"use client";

import { useEffect, useState } from 'react';
import { migrateScores } from '@/lib/score-migration';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function ScoreMigration() {
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [migrationSuccess, setMigrationSuccess] = useState(false);

  useEffect(() => {
    // Only run once when component mounts
    try {
      const migrationResult = migrateScores();
      setMigrationComplete(true);
      
      if (migrationResult) {
        setMigrationSuccess(true);
        setShowAlert(true);
        
        // Hide after 10 seconds
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Migration component error:', error);
      setMigrationComplete(true);
    }
  }, []);

  if (!showAlert || !migrationSuccess) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert className="bg-background border">
        <div className="flex justify-between items-start">
          <div>
            <AlertTitle>Resultaten hersteld</AlertTitle>
            <AlertDescription>
              Je eerdere quiz resultaten zijn succesvol hersteld.
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowAlert(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
} 