import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateVoterForm } from "@/components/vote/create-voter-form";

export default function VotePage() {
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