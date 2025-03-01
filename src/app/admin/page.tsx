import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Trophy } from "lucide-react";

export default async function AdminPage() {
  // For simplicity, we're using the first admin user
  // In a real application, you would use authentication
  const adminUser = await prisma.user.findFirst({
    where: { isAdmin: true },
  });

  // If no admin user exists, redirect to the home page
  if (!adminUser) {
    redirect("/");
  }

  // Fetch statistics for the dashboard
  const usersCount = await prisma.user.count({
    where: { isAdmin: false },
  });
  
  const votesCount = await prisma.vote.count();
  
  const totalCategories = await prisma.category.count();
  const categoriesWithWinners = await prisma.category.count({
    where: { winnerId: { not: null } },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-brand-primary">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Manage categories, winners, and view statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-brand-primary">Total Voters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{usersCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-brand-primary">Total Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{votesCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-brand-primary">Winners Announced</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{categoriesWithWinners} / {totalCategories}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-brand-primary">Manage Winners</CardTitle>
            <CardDescription>
              Set or update winners for each category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>As winners are announced during the ceremony, update each category with the official winner.</p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/winners" className="w-full">
              <Button className="w-full bg-brand-primary">
                <Award className="mr-2 h-4 w-4" />
                Set Winners
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-brand-primary">View Results</CardTitle>
            <CardDescription>
              Check the leaderboard and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>View the real-time leaderboard and see how voters are scoring as winners are announced.</p>
          </CardContent>
          <CardFooter>
            <Link href="/results" className="w-full">
              <Button variant="outline" className="w-full border-brand-secondary text-brand-secondary">
                <Trophy className="mr-2 h-4 w-4" />
                View Leaderboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}