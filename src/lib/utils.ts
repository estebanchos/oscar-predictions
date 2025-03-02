import { Category, Vote, VoteWithRelations } from "@/types";
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
export function calculateScore(votes: Vote[], categories: Category[]): number {
  if (!votes || !categories) return 0;
  
  let score = 0;
  
  for (const vote of votes) {
    const matchingWinner = categories.find(
      (category) => category.id === vote.categoryId && category.winnerId === vote.nomineeId
    );
    
    if (matchingWinner) {
      score += 1;
    }
  }
  
  return score;
}

// Get remaining categories for a user to vote on
export function sortCategoriesByOrder<T extends { order: number }>(categories: T[]): T[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getVotingProgress(categories: Category[], votes: VoteWithRelations[]): {
  votedCount: number;
  totalCount: number;
  progressPercentage: number;
} {
  const votedCount = votes.length;
  const totalCount = categories.length;
  const progressPercentage = totalCount > 0 ? (votedCount / totalCount) * 100 : 0;
  
  return {
    votedCount,
    totalCount,
    progressPercentage
  };
}

export function hasCompletedAllVotes(categories: Category[], votes: Vote[]): boolean {
  if (!categories.length) return false;
  return votes.length === categories.length;
}

export function getWinnerMatches(votes: Vote[], categories: Category[]): {
  correct: Vote[];
  incorrect: Vote[];
  pending: Vote[];
} {
  const correct: Vote[] = [];
  const incorrect: Vote[] = [];
  const pending: Vote[] = [];
  
  for (const vote of votes) {
    const category = categories.find(c => c.id === vote.categoryId);
    
    if (!category || category.winnerId === null) {
      // No winner announced yet
      pending.push(vote);
    } else if (category.winnerId === vote.nomineeId) {
      // Correct prediction
      correct.push(vote);
    } else {
      // Incorrect prediction
      incorrect.push(vote);
    }
  }
  
  return { correct, incorrect, pending };
}