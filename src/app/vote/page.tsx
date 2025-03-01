import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateVoterForm } from "@/components/vote/create-voter-form";

export default function VotePage() {
  return (
    <div className="container max-w-md mx-auto py-10">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Enter Your Name</CardTitle>
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