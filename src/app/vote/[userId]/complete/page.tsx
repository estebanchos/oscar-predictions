import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Trophy } from "lucide-react";

interface VoteCompletePageProps {
  params: Promise< {
    userId: string;
  }>;
}

export default async function VoteCompletePage({ params }: VoteCompletePageProps) {
  const { userId } = await params;

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If user doesn't exist, 404
  if (!user) {
    notFound();
  }

  // Fetch total number of categories
  const totalCategories = await prisma.category.count();

  // Fetch user's votes count
  const votesCount = await prisma.vote.count({
    where: { userId },
  });

  // Check if all categories have votes
  const allCategoriesVoted = votesCount === totalCategories;

  return (
    <div className="container max-w-md mx-auto py-10">
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-brand-primary">All Done!</CardTitle>
          <CardDescription>
            {allCategoriesVoted 
              ? `You've completed your Oscar predictions for all categories.` 
              : `You've submitted some Oscar predictions, but not for all categories.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-2">
            <span className="font-bold">{user.name}</span>, 
            you voted for <span className="font-bold">{votesCount}</span> out of <span className="font-bold">{totalCategories}</span> categories.
          </p>
          <p className="text-muted-foreground">
            Come back after the ceremony to see how well you did!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {!allCategoriesVoted && (
            <Link href={`/vote/${userId}`} className="w-full">
              <Button className="w-full" variant="outline">
                Continue Voting
              </Button>
            </Link>
          )}
          
          <Link href="/vote" className="w-full">
            <Button className="w-full mb-2 bg-brand-secondary" variant="outline">
              Start New Ballot
            </Button>
          </Link>
          
          <Link href="/results" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2 bg-brand-primary">
              <Trophy className="h-5 w-5" />
              View Leaderboard
            </Button>
          </Link>
          
          <Link href="/" className="pt-4 text-sm text-muted-foreground hover:underline flex items-center justify-center gap-1">
            <Home className="h-3 w-3" />
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}