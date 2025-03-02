import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CheckCircle, XCircle, Award, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserResultsPageProps {
  params: Promise< {
    userId: string;
  }>;
}

export default async function UserResultsPage({ params }: UserResultsPageProps) {
  const { userId } = await params;

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If user doesn't exist, 404
  if (!user) {
    notFound();
  }

  // Fetch all categories with nominees and winners
  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
      winner: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  // Fetch user's votes
  const votes = await prisma.vote.findMany({
    where: {
      userId,
    },
    include: {
      category: true,
      nominee: true,
    },
  });

  // Get announced categories (those with winners)
  const announcedCategories = categories.filter((category) => category.winnerId);
  const announcedCount = announcedCategories.length;
  
  // Calculate correct predictions
  let correctPredictions = 0;
  
  // For each vote, check if it matches the winner
  for (const vote of votes) {
    const category = categories.find((c) => c.id === vote.categoryId);
    if (category && category.winnerId === vote.nomineeId) {
      correctPredictions++;
    }
  }
  
  // Calculate score percentage if any categories have been announced
  const scorePercentage = announcedCount > 0 
    ? Math.round((correctPredictions / announcedCount) * 100) 
    : 0;

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/results">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Leaderboard
          </Button>
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-brand-primary">{user.name} Predictions</h1>
        <p className="text-lg text-muted-foreground">
          {announcedCount === 0 ? (
            "Winners have not been announced yet. Check back during the ceremony!"
          ) : (
            `${correctPredictions} correct predictions out of ${announcedCount} announced categories (${scorePercentage}%)`
          )}
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-brand-primary flex items-center gap-2">
            <Award className="h-5 w-5" />
            Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Prediction</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead className="w-24 text-center">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const vote = votes.find((v) => v.categoryId === category.id);
                const hasWinner = !!category.winnerId;
                const isCorrect = hasWinner && vote && vote.nomineeId === category.winnerId;
                
                return (
                  <TableRow key={category.id} className={!vote ? "opacity-60" : ""}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      {vote ? vote.nominee.name : "No prediction"}
                    </TableCell>
                    <TableCell>
                      {hasWinner ? category.winner?.name : "Not announced"}
                    </TableCell>
                    <TableCell className="text-center">
                      {!vote ? (
                        <span className="text-muted-foreground text-sm">Skipped</span>
                      ) : !hasWinner ? (
                        <span className="text-muted-foreground text-sm">Pending</span>
                      ) : isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 inline-block" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 inline-block" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}