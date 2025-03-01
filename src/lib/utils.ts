import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

// Calculate user score based on their votes and winners
export function calculateScore(votes: any[], winners: any[]): number {
  if (!votes || !winners) return 0;
  
  let score = 0;
  
  for (const vote of votes) {
    const matchingWinner = winners.find(
      (winner) => winner.categoryId === vote.categoryId && winner.nomineeId === vote.nomineeId
    );
    
    if (matchingWinner) {
      score += 1;
    }
  }
  
  return score;
}

// Get remaining categories for a user to vote on
export function getRemainingCategories(allCategories: any[], votedCategories: string[]): any[] {
  return allCategories.filter((category) => !votedCategories.includes(category.id));
}

// Sort categories by order
export function sortCategoriesByOrder(categories: any[]): any[] {
  return [...categories].sort((a, b) => a.order - b.order);
}