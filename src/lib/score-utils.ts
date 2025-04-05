export interface Quiz {
  id: string;
  type: string;
  date: string;
  correct: number;
  total: number;
  percentage: number;
}

/**
 * Saves a quiz score to localStorage
 */
export function saveQuizScore(type: string, correct: number, total: number): void {
  try {
    // Get existing scores or initialize empty array
    const existingScores = localStorage.getItem('quizScores');
    const scores: Quiz[] = existingScores ? JSON.parse(existingScores) : [];
    
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
    
    // Add to scores and save
    scores.push(newScore);
    localStorage.setItem('quizScores', JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving quiz score:', error);
  }
}

/**
 * Gets all saved quiz scores
 */
export function getQuizScores(): Quiz[] {
  try {
    const scores = localStorage.getItem('quizScores');
    return scores ? JSON.parse(scores) : [];
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
  try {
    const savedScores = localStorage.getItem('quizScores');
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
  try {
    const savedScores = localStorage.getItem('quizScores');
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
  try {
    const savedScores = localStorage.getItem('quizScores');
    if (!savedScores) return [];
    
    const allScores: Quiz[] = JSON.parse(savedScores);
    return allScores.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all scores:', error);
    return [];
  }
} 