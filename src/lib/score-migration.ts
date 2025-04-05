"use client";

import { Quiz } from './score-utils';

const OLD_KEY = 'quizScores';
const NEW_KEY = 'chemistry_quiz_scores';

/**
 * Migrates scores from the old localStorage key to the new one
 * Returns true if migration was performed, false if not needed
 */
export function migrateScores(): boolean {
  try {
    // Check if we need to migrate
    const oldScores = localStorage.getItem(OLD_KEY);
    const newScores = localStorage.getItem(NEW_KEY);
    
    console.log('[Migration] Checking for old scores:', oldScores);
    console.log('[Migration] Existing new scores:', newScores);
    
    // If no old scores or already have new scores, no migration needed
    if (!oldScores) {
      console.log('[Migration] No old scores found, migration not needed');
      return false;
    }
    
    // Parse old scores
    const oldScoresArray = JSON.parse(oldScores) as Quiz[];
    console.log('[Migration] Old scores parsed:', oldScoresArray);
    
    if (!Array.isArray(oldScoresArray) || oldScoresArray.length === 0) {
      console.log('[Migration] Old scores invalid or empty, skipping migration');
      return false;
    }
    
    // Parse new scores if they exist
    const newScoresArray = newScores ? JSON.parse(newScores) as Quiz[] : [];
    console.log('[Migration] Existing new scores parsed:', newScoresArray);
    
    // Merge scores (old + new), with new scores taking precedence if IDs match
    const mergedScores = [...oldScoresArray];
    
    // Add new scores that don't exist in old scores
    if (newScoresArray.length > 0) {
      newScoresArray.forEach(newScore => {
        const exists = mergedScores.some(oldScore => oldScore.id === newScore.id);
        if (!exists) {
          mergedScores.push(newScore);
        }
      });
    }
    
    console.log('[Migration] Merged scores:', mergedScores);
    
    // Save to new key
    localStorage.setItem(NEW_KEY, JSON.stringify(mergedScores));
    
    // Optionally clear old key to avoid confusion
    // localStorage.removeItem(OLD_KEY);
    
    console.log('[Migration] Migration successful');
    return true;
  } catch (error) {
    console.error('[Migration] Error during score migration:', error);
    return false;
  }
} 