import { prisma } from "@/lib/prisma";
import { calculateScore } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy, Award } from "lucide-react";
import Link from "next/link";

export default async function ResultsPage() {
  // Fetch all users (non-admin)
  const users = await prisma.user.findMany({
    where: { isAdmin: false },
    include: { votes: true },
  });

  // Fetch all categories with winners
  const categories = await prisma.category.findMany({
    where: { winnerId: { not: null } },
    include: { winner: true },
  });

  // Calculate scores for each user
  const usersWithScores = users.map((user) => {
    // Create an array of winning votes (matches between user votes and winners)
    const winningVotes = user.votes.filter((vote) => {
      const matchingCategory = categories.find((cat) => cat.id === vote.categoryId);
      return matchingCategory && matchingCategory.winnerId === vote.nomineeId;
    });

    return {
      ...user,
      score: winningVotes.length,
      winningVotes,
      totalVotes: user.votes.length,
    };
  });

  // Sort users by score (highest first)
  const sortedUsers = [...usersWithScores].sort((a, b) => b.score - a.score);

  // Get announced categories count
  const announcedCount = categories.length;
  const totalCategoriesCount = await prisma.category.count();
  
  // Get top three users
  const topThree = sortedUsers.slice(0, 3);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-brand-primary">Oscar Predictions Leaderboard</h1>
        <p className="text-lg text-muted-foreground">
          {announcedCount === 0 ? (
            "Winners have not been announced yet. Check back during the ceremony!"
          ) : announcedCount === totalCategoriesCount ? (
            "All winners have been announced. Final scores below!"
          ) : (
            `${announcedCount} out of ${totalCategoriesCount} categories have been announced.`
          )}
        </p>
      </div>

      {announcedCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((user, index) => (
            <Card key={user.id} className={`shadow-md ${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : index === 2 ? 'border-amber-700' : ''}`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border">
                  {index === 0 ? (
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  ) : index === 1 ? (
                    <Trophy className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Trophy className="h-6 w-6 text-amber-700" />
                  )}
                </div>
                <CardTitle className="text-xl text-brand-primary">
                  {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : '🥉 '}
                  {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-brand-primary">{user.score}</p>
                <p className="text-sm text-muted-foreground">
                  {user.score === 1 ? "point" : "points"} ({user.score}/{announcedCount})
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-brand-primary flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Full Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Categories Voted</TableHead>
                <TableHead className="text-center">Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center font-medium">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </TableCell>
                  <TableCell>
                    <Link href={`/results/${user.id}`} className="hover:text-brand-primary hover:underline">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {user.score}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.totalVotes}/{totalCategoriesCount}
                  </TableCell>
                  <TableCell className="text-center">
                    {announcedCount > 0 
                      ? `${Math.round((user.score / announcedCount) * 100)}%` 
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {announcedCount > 0 && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-brand-primary flex items-center gap-2">
              <Award className="h-5 w-5" />
              Announced Winners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Winner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.winner?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}