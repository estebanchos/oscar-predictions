'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { userSchema, voteSchema, winnerSchema } from './validators';

// User Actions
export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;

  // Validate the data
  const validatedFields = userSchema.safeParse({ name });

  if (!validatedFields.success) {
    return {
      error: "Invalid name. Please provide a valid name."
    };
  }

  try {
    // Create user in the database
    const user = await prisma.user.create({
      data: {
        name: validatedFields.data.name,
        isAdmin: false,
      },
    });

    // Revalidate the users page
    revalidatePath('/vote');

    // Return the user ID instead of redirecting
    return {
      success: true,
      userId: user.id
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "Failed to create user. Please try again."
    };
  }
}

export async function getAllUsers() {
  try {
    // Get all non-admin users
    const users = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users" };
  }
}

// Vote Actions
export async function submitVote(formData: FormData) {
  const userId = formData.get('userId') as string;
  const categoryId = formData.get('categoryId') as string;
  const nomineeId = formData.get('nomineeId') as string;

  if (!userId) {
    return { error: "User ID is required" };
  }

  // Validate vote data
  const validatedFields = voteSchema.safeParse({ categoryId, nomineeId });

  if (!validatedFields.success) {
    return {
      error: "Invalid vote data. Please select a valid nominee."
    };
  }

  try {
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return { error: "User not found" };
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return { error: "Category not found" };
    }

    // Check if nominee exists and belongs to the category
    const nomineeExists = await prisma.nominee.findFirst({
      where: {
        id: nomineeId,
        categoryId
      },
    });

    if (!nomineeExists) {
      return { error: "Nominee not found or does not belong to this category" };
    }

    // Create or update the vote
    const vote = await prisma.vote.upsert({
      where: {
        userId_categoryId: {
          userId,
          categoryId,
        },
      },
      update: {
        nomineeId,
      },
      create: {
        userId,
        categoryId,
        nomineeId,
      },
    });

    // Revalidate the user's voting page
    revalidatePath(`/vote/${userId}`);

    return { success: true, vote };
  } catch (error) {
    console.error("Error creating/updating vote:", error);
    return { error: "Failed to create/update vote" };
  }
}

export async function getUserVotes(userId: string) {
  try {
    const votes = await prisma.vote.findMany({
      where: { userId },
      include: {
        user: true,
        category: true,
        nominee: true,
      },
      orderBy: {
        category: {
          order: "asc",
        },
      },
    });

    return { votes };
  } catch (error) {
    console.error("Error fetching votes:", error);
    return { error: "Failed to fetch votes" };
  }
}

// Admin Actions
export async function setWinner(formData: FormData) {
  const categoryId = formData.get('categoryId') as string;
  const nomineeId = formData.get('nomineeId') as string;

  // Validate winner data
  const validatedFields = winnerSchema.safeParse({ categoryId, nomineeId });

  if (!validatedFields.success) {
    return {
      error: "Invalid winner data. Please select a valid nominee."
    };
  }

  try {
    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return { error: "Category not found" };
    }

    // Check if nominee exists and belongs to the category
    const nomineeExists = await prisma.nominee.findFirst({
      where: {
        id: nomineeId,
        categoryId
      },
    });

    if (!nomineeExists) {
      return { error: "Nominee not found or does not belong to this category" };
    }

    // Update the category with the winner
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { winnerId: nomineeId },
    });

    // Revalidate relevant paths
    revalidatePath('/admin/winners');
    revalidatePath('/results');

    return { success: true, category };
  } catch (error) {
    console.error("Error setting winner:", error);
    return { error: "Failed to set winner" };
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        nominees: true,
        winner: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return { categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Failed to fetch categories" };
  }
}

export async function getCategory(categoryId: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        nominees: true,
        winner: true,
      },
    });

    if (!category) {
      return { error: "Category not found" };
    }

    return { category };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { error: "Failed to fetch category" };
  }
}