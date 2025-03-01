"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Award } from "lucide-react";
import { useFormStatus } from "react-dom";
import { setWinner } from "@/lib/actions";
import { Toaster, toast } from "sonner";
import { Category, Nominee } from "@/types";
import { cn } from "@/lib/utils";

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
          Saving...
        </>
      ) : (
        <>
          <Award className="mr-2 h-4 w-4" />
          Save Winner
        </>
      )}
    </Button>
  );
}

interface WinnerFormProps {
  category: Category;
  currentWinnerId: string;
}

export function WinnerForm({ category, currentWinnerId }: WinnerFormProps) {
  const router = useRouter();
  const [selectedNomineeId, setSelectedNomineeId] = useState<string>(currentWinnerId);

  async function handleSubmit(formData: FormData) {
    if (!selectedNomineeId) {
      toast.error("Please select a winner");
      return;
    }

    formData.append('categoryId', category.id);
    formData.append('nomineeId', selectedNomineeId);

    const result = await setWinner(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Winner set successfully!");
      router.push("/admin/winners");
    }
  }

  return (
    <div>
      <form action={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select the winner:</h3>

          <RadioGroup
            value={selectedNomineeId}
            onValueChange={setSelectedNomineeId}
            className={(cn(
              category.nominees.length > 6 && 'grid grid-cols-2 gap-4',
              "space-y-4"
            ))}
          >
            {category.nominees.map((nominee: Nominee) => (
              <div key={nominee.id} className="flex items-center space-x-4 border p-4 rounded-md">
                <RadioGroupItem
                  key={nominee.id}
                  value={nominee.id}
                  id={nominee.id}
                  className="h-5 w-5 mt-1 border-brand-primary text-brand-primary"
                />
                <div className="flex flex-1 items-center space-x-4">
                  <Label
                    htmlFor={nominee.id}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {nominee.name}
                    {nominee.id === currentWinnerId && (
                      <span className="ml-2 text-sm text-green-600">
                        (Current Winner)
                      </span>
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}