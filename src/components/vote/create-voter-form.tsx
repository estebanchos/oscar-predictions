"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createUser } from "@/lib/actions";
import { SubmitButton } from "./submit-button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateVoterForm() {
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: UserFormValues) {
    try {
      const formData = new FormData();
      formData.append('name', data.name);

      const result = await createUser(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.userId) {
        // Handle the redirect on the client side
        router.push(`/vote/${result.userId}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}