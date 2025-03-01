"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { CategoryVoteCard } from "@/components/vote/category-vote-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VotingDashboardProps {
  user: any;
  categories: any[];
  votes: any[];
  nextCategory: any;
}

export function VotingDashboard({
  user,
  categories,
  votes,
  nextCategory,
}: VotingDashboardProps) {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState<any>(nextCategory);
  const [skippedCategories, setSkippedCategories] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress percentage
    const votedCount = votes.length;
    const totalCategories = categories.length;
    const progressPercent = (votedCount / totalCategories) * 100;
    setProgress(progressPercent);
  }, [votes, categories]);

  // Function to handle "Skip for Now" button
  const handleSkip = () => {
    if (!currentCategory) return;

    // Add current category to skipped list
    setSkippedCategories((prev) => [...prev, currentCategory.id]);

    // Find next unskipped and unvoted category
    const votedCategoryIds = votes.map((vote) => vote.categoryId);

    // First priority: Find categories that haven't been voted on or skipped
    const nextUnvotedUnskipped = categories.find(
      (category) =>
        !votedCategoryIds.includes(category.id) &&
        !skippedCategories.includes(category.id) &&
        category.id !== currentCategory.id
    );

    if (nextUnvotedUnskipped) {
      setCurrentCategory(nextUnvotedUnskipped);
      return;
    }

    // Second priority: Go to a skipped category
    const nextSkipped = categories.find(
      (category) =>
        !votedCategoryIds.includes(category.id) &&
        skippedCategories.includes(category.id)
    );

    if (nextSkipped) {
      // Remove from skipped list since we're now handling it
      setSkippedCategories((prev) =>
        prev.filter((id) => id !== nextSkipped.id)
      );
      setCurrentCategory(nextSkipped);
      return;
    }

    // If there are no more categories to vote on, redirect to completion
    router.push(`/vote/${user.id}/complete`);
  };

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-brand-primary">{user.name}'s Oscar Predictions</h1>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {votes.length} of {categories.length} categories voted
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-muted"
          // indicatorClassName="bg-brand-primary" 
          />
        </div>
      </div>

      {currentCategory ? (
        <div className="space-y-6">
          <CategoryVoteCard
            category={currentCategory}
            userId={user.id}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex items-center gap-2 border-brand-secondary text-brand-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
              Skip for Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg shadow">
          <p className="text-lg font-medium mb-4">
            You have votes for all categories!
          </p>
          <Button
            onClick={() => router.push(`/vote/${user.id}/complete`)}
            className="flex items-center gap-2 bg-brand-primary"
          >
            View Summary
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}