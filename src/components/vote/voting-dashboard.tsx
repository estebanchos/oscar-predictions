"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { submitVote } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Category, Nominee, User, VoteWithRelations } from "@/types";
import { cn } from "@/lib/utils";

interface VotingDashboardProps {
  user: User;
  categories: Category[];
  votes: VoteWithRelations[];
}

export function VotingDashboard({
  user,
  categories,
  votes: initialVotes,
}: VotingDashboardProps) {
  const router = useRouter();


  const [votes, setVotes] = useState(initialVotes);
  const [skippedCategoryIds, setSkippedCategoryIds] = useState<string[]>([]);
  const [selectedNomineeId, setSelectedNomineeId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Get voted category IDs
  const votedCategoryIds = votes.map(vote => vote.categoryId);

  // Calculate the current category (first unskipped, unvoted category)
  const getCurrentCategory = useCallback((): Category | null => {
    // First try to find a category that hasn't been voted on or skipped
    const nextUnvotedUnskipped = categories.find(
      category =>
        !votedCategoryIds.includes(category.id) &&
        !skippedCategoryIds.includes(category.id)
    );

    if (nextUnvotedUnskipped) {
      return nextUnvotedUnskipped;
    }

    // If all categories are voted or skipped, find the first skipped one
    const nextSkipped = categories.find(
      category =>
        !votedCategoryIds.includes(category.id) &&
        skippedCategoryIds.includes(category.id)
    );

    if (nextSkipped) {
      return nextSkipped;
    }

    // If all categories are voted, return null
    return null;
  }, [categories, votedCategoryIds, skippedCategoryIds]);

  // Get the current category to display
  const currentCategory = getCurrentCategory();

  // Calculate progress
  const progress = (votes.length / categories.length) * 100;

  useEffect(() => {
    if (!currentCategory && votes.length === categories.length && categories.length > 0) {
      setIsComplete(true);
      router.push(`/vote/${user.id}/complete`);
    }
  }, [currentCategory, votes.length, categories.length, user.id, router]);

  // Handle skip button
  const handleSkip = () => {
    if (!currentCategory) return;

    // Add current category to skipped list
    setSkippedCategoryIds(prev => [...prev, currentCategory.id]);

    // Reset selected nominee
    setSelectedNomineeId(null);
  };

  // Handle vote submission
  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentCategory || !selectedNomineeId) {
      toast.error("Please select a nominee");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('categoryId', currentCategory.id);
      formData.append('nomineeId', selectedNomineeId);

      const result = await submitVote(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        // Find the selected nominee object
        const selectedNominee = currentCategory.nominees.find(
          (n): boolean => n.id === selectedNomineeId
        );

        if (!selectedNominee) {
          toast.error("Selected nominee not found");
          return;
        }

        // Optimistically update the local votes array
        const newVote: VoteWithRelations = {
          id: Date.now().toString(), // Temporary ID
          userId: user.id,
          categoryId: currentCategory.id,
          nomineeId: selectedNomineeId,
          category: currentCategory,
          nominee: selectedNominee,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        setVotes(prev => [...prev, newVote]);

        // Remove the category from skipped if it was there
        if (skippedCategoryIds.includes(currentCategory.id)) {
          setSkippedCategoryIds(prev => prev.filter(id => id !== currentCategory.id));
        }

        toast.success("Vote submitted successfully!");

        // Reset selected nominee for the next category
        setSelectedNomineeId(null);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRandomPick = useCallback(() => {
    if (!currentCategory) return;

    const nominees = currentCategory.nominees;
    const randomIndex = Math.floor(Math.random() * nominees.length);
    const randomNominee = nominees[randomIndex];

    setSelectedNomineeId(randomNominee.id);
  }, [currentCategory]);

  if (isComplete) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        <span className="ml-2">Completing your ballot...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-brand-primary">{user.name} Oscar Predictions</h1>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {votes.length} of {categories.length} categories voted
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>
      </div>

      {currentCategory ? (
        <div className="space-y-6">
          <div className="shadow-lg rounded-lg border bg-card text-card-foreground">
            <div className="bg-muted/30 p-6 py-4 rounded-t-lg border-b">
              <h3 className="text-center text-xl text-brand-primary font-semibold">
                {currentCategory.name}
              </h3>
            </div>
            <div className="p-6 pt-6">
              <form onSubmit={handleSubmitVote}>
                <RadioGroup
                  value={selectedNomineeId || ""}
                  onValueChange={setSelectedNomineeId}
                  className={(cn(
                    currentCategory.nominees.length > 6 && 'grid grid-cols-2 gap-4',
                    "space-y-4"
                  ))}
                >
                  {currentCategory.nominees.map((nominee: Nominee) => (
                    <div key={nominee.id} className="flex items-center space-x-4">
                      <RadioGroupItem
                        value={nominee.id}
                        id={nominee.id}
                        className="h-5 w-5 border-brand-primary text-brand-primary"
                      />
                      <div className="flex flex-1 items-center space-x-4">
                        {nominee.imageUrl && (
                          <div className="h-16 w-12 overflow-hidden rounded-sm relative flex-shrink-0">
                            <Image
                              src={nominee.imageUrl}
                              alt={nominee.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <Label
                          htmlFor={nominee.id}
                          className="flex-1 cursor-pointer font-medium text-sm"
                        >
                          {nominee.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={handleRandomPick}
                  disabled={isSubmitting}
                >
                  Pick Random Nominee
                </Button>

                <div className="mt-8 flex justify-between">
                  <Button
                    type="submit"
                    className="bg-brand-primary"
                    disabled={!selectedNomineeId || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Vote"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSkip}
                    className="flex items-center gap-2 border-brand-secondary text-brand-secondary"
                    disabled={isSubmitting}
                  >
                    <ChevronRight className="h-4 w-4" />
                    Skip for Now
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg shadow">
          <p className="text-lg font-medium mb-4">
            You have voted for all categories!
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