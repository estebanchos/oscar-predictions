import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Oscar Predictions 2025</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Predict the winners of the 2025 Academy Awards and see how your picks stack up!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Make Your Predictions</CardTitle>
            <CardDescription>
              Enter your name and predict winners for all 23 categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Vote for your picks in each Oscar category and see how well you do when the winners are announced.</p>
          </CardContent>
          <CardFooter>
            <Link href="/vote" className="w-full">
              <Button size="lg" className="w-full">Start Voting</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>View Leaderboard</CardTitle>
            <CardDescription>
              Check how everyone is scoring as winners are announced
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>See real-time scores and rankings as the winners are announced on Oscar night.</p>
          </CardContent>
          <CardFooter>
            <Link href="/results" className="w-full">
              <Button size="lg" variant="outline" className="w-full">View Results</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="pt-8">
        <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
          Admin Access
        </Link>
      </div>
    </div>
  );
}