"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { submitVote } from "@/lib/actions";
import { Toaster, toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      className="w-full md:w-auto bg-brand-primary"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Vote"
      )}
    </Button>
  );
}

interface CategoryVoteCardProps {
  category: any;
  userId: string;
}

export function CategoryVoteCard({
  category,
  userId,
}: CategoryVoteCardProps) {
  const router = useRouter();
  const [selectedNomineeId, setSelectedNomineeId] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    // Add the selected nominee to form data
    if (!selectedNomineeId) return;
    
    formData.append('userId', userId);
    formData.append('categoryId', category.id);
    formData.append('nomineeId', selectedNomineeId);
    
    const result = await submitVote(formData);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Vote submitted successfully!");
      router.refresh();
    }
  }

  return (
    <Card className="shadow-lg">
      <Toaster position="top-center" />
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-center text-xl text-brand-primary">
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={handleSubmit}>
          <RadioGroup
            onValueChange={(value) => setSelectedNomineeId(value)}
            className="space-y-4"
          >
            {category.nominees.map((nominee: any) => (
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
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {nominee.name}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}