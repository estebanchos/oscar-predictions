import { z } from 'zod';

// User validation schema
export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
});

// Vote validation schema
export const voteSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  nomineeId: z.string().min(1, 'Nominee is required'),
});

// Winner validation schema (for admin)
export const winnerSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  nomineeId: z.string().min(1, 'Winner is required'),
});

// Types
export type UserFormValues = z.infer<typeof userSchema>;
export type VoteFormValues = z.infer<typeof voteSchema>;
export type WinnerFormValues = z.infer<typeof winnerSchema>;