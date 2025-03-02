import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateVoterForm } from "@/components/vote/create-voter-form";
import { getVotingStatus } from "@/lib/actions";

export default async function VotePage() {
  const { votingEnabled } = await getVotingStatus();

  if (!votingEnabled) {
    return (
      <div className="container max-w-6xl mx-auto py-8">
        <div className="text-center p-8 border rounded-lg shadow">
          <p className="text-lg font-medium">
            Voting is currently closed.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-lg mx-auto py-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-brand-primary">Enter Your Name</CardTitle>
          <CardDescription>
            Create your voter profile to start making Oscar predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateVoterForm />
        </CardContent>
      </Card>
    </div>
  );
}