// User types
export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category types
export interface Category {
  id: string;
  name: string;
  order: number;
  winnerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  nominees: Nominee[];
  winner?: Nominee | null;
}

// Nominee types
export interface Nominee {
  id: string;
  name: string;
  imageUrl?: string | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Vote types
export interface Vote {
  id: string;
  userId: string;
  categoryId: string;
  nomineeId: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
  nominee?: Nominee;
  user?: User;
}

// Client-side vote type (includes related entities)
export interface VoteWithRelations extends Vote {
  category: Category;
  nominee: Nominee;
}

// Form submission results
export interface ActionResult {
  success?: boolean;
  error?: string;
  userId?: string;
  vote?: Vote;
  category?: Category;
}