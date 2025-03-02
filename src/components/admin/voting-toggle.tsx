'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toggleVoting } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface VotingToggleProps {
  initialEnabled: boolean;
}

export function VotingToggle({ initialEnabled }: VotingToggleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enabled, setEnabled] = useState(initialEnabled);

  const handleToggle = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('enabled', (!enabled).toString());

      const result = await toggleVoting(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        setEnabled(!enabled);
        toast.success(`Voting has been ${!enabled ? 'enabled' : 'disabled'}`);
      }
    } catch (error) {
      toast.error("Failed to toggle voting");
      console.error("Error toggling voting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isSubmitting}
      variant={enabled ? "destructive" : "default"}
      className="w-full sm:w-fit"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : (
        enabled ? "Disable Voting" : "Enable Voting"
      )}
    </Button>
  );
}