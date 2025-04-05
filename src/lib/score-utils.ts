export interface Quiz {
  id: string;
  type: string;
  date: string;
  correct: number;
  total: number;
  percentage: number;
}

const STORAGE_KEY = 'chemistry_quiz_scores';

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.error('localStorage not available:', e);
    return false;
  }
}

/**
 * Saves a quiz score to localStorage
 */
export function saveQuizScore(type: string, correct: number, total: number): void {
  if (!isLocalStorageAvailable()) return;
  
  try {
    console.log('Saving quiz score:', { type, correct, total });
    
    // Get existing scores or initialize empty array
    const existingScores = localStorage.getItem(STORAGE_KEY);
    console.log('Existing scores from storage:', existingScores);
    
    const scores: Quiz[] = existingScores ? JSON.parse(existingScores) : [];
    console.log('Parsed scores:', scores);
    
    // Calculate percentage
    const percentage = Math.round((correct / total) * 100);
    
    // Create new score object
    const newScore: Quiz = {
      id: generateId(),
      type,
      date: new Date().toISOString(),
      correct,
      total,
      percentage
    };
    
    console.log('New score to add:', newScore);
    
    // Add to scores and save
    scores.push(newScore);
    
    // Verify we're not exceeding storage limits
    const scoresJson = JSON.stringify(scores);
    if (scoresJson.length > 4.5 * 1024 * 1024) { // Keep under 5MB to be safe
      console.warn('Quiz scores approaching storage limit, removing oldest entries');
      // Remove oldest entries to keep size manageable
      const trimmedScores = scores.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ).slice(0, Math.floor(scores.length * 0.8)); // Keep 80% of newest scores
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedScores));
    } else {
      localStorage.setItem(STORAGE_KEY, scoresJson);
    }
    
    console.log('Successfully saved scores to localStorage');
    
    // Verify the save was successful
    const savedScores = localStorage.getItem(STORAGE_KEY);
    console.log('Verification - scores after save:', savedScores);
  } catch (error) {
    console.error('Error saving quiz score:', error);
  }
}

/**
 * Gets all saved quiz scores
 */
export function getQuizScores(): Quiz[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    console.log('Getting all quiz scores');
    const scores = localStorage.getItem(STORAGE_KEY);
    console.log('Raw scores from storage:', scores);
    const parsedScores = scores ? JSON.parse(scores) : [];
    console.log('Parsed scores:', parsedScores);
    return parsedScores;
  } catch (error) {
    console.error('Failed to retrieve quiz scores', error);
    return [];
  }
}

/**
 * Gets scores for a specific section
 */
export function getSectionScores(sectionId: string): Quiz[] {
  const allScores = getQuizScores();
  return allScores.filter(score => score.type === sectionId);
}

/**
 * Formats the date for display
 */
export function formatDatetime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    return 'Ongeldige datum';
  }
}

// Generate a unique ID for each score
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get scores for a specific quiz type
export function getScoresByType(type: string): Quiz[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (!savedScores) return [];
    
    const allScores: Quiz[] = JSON.parse(savedScores);
    return allScores
      .filter(score => score.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting scores by type:', error);
    return [];
  }
}

// Get all quiz types from scores
export function getQuizTypes(): string[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (!savedScores) return [];
    
    const allScores: Quiz[] = JSON.parse(savedScores);
    // Get unique quiz types
    return [...new Set(allScores.map(score => score.type))];
  } catch (error) {
    console.error('Error getting quiz types:', error);
    return [];
  }
}

// Get all quiz scores
export function getAllScores(): Quiz[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    console.log('Getting all scores');
    const savedScores = localStorage.getItem(STORAGE_KEY);
    console.log('Raw scores from storage:', savedScores);
    
    if (!savedScores) return [];
    
    const allScores: Quiz[] = JSON.parse(savedScores);
    console.log('Parsed all scores:', allScores);
    
    return allScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all scores:', error);
    return [];
  }
}

// Export/import functions for backup purposes
export function exportScores(): string {
  const scores = getQuizScores();
  return JSON.stringify(scores);
}

export function importScores(jsonData: string): boolean {
  try {
    const importedScores = JSON.parse(jsonData) as Quiz[];
    
    // Validate the imported data has the expected structure
    const isValid = importedScores.every(score => 
      typeof score.id === 'string' &&
      typeof score.type === 'string' &&
      typeof score.date === 'string' &&
      typeof score.correct === 'number' &&
      typeof score.total === 'number' &&
      typeof score.percentage === 'number'
    );
    
    if (!isValid) {
      console.error('Invalid quiz score data structure');
      return false;
    }
    
    // Merge with existing scores
    const existingScores = getQuizScores();
    const allScores = [...existingScores, ...importedScores];
    
    // Remove duplicates based on id
    const uniqueScores = allScores.filter((score, index, self) =>
      index === self.findIndex((s) => s.id === score.id)
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueScores));
    return true;
  } catch (error) {
    console.error('Error importing scores:', error);
    return false;
  }
} 