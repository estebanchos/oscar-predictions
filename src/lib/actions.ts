'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';
import { userSchema, voteSchema, winnerSchema } from './validators';
import { ActionResult } from '@/types';

// User Actions
export async function createUser(formData: FormData): Promise<ActionResult> {
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
export async function submitVote(formData: FormData): Promise<ActionResult> {
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
    revalidatePath(`/vote/[userId]`, 'layout');
    revalidatePath(`/vote/${userId}`, 'page');
    revalidatePath(`/results`, 'layout');
    revalidatePath(`/results/${userId}`, 'page');

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
export async function setWinner(formData: FormData): Promise<ActionResult> {
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
      include: {
        nominees: true,
      }
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

export async function validateAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }

  return password === adminPassword;
}

export async function toggleVoting(formData: FormData): Promise<ActionResult> {
  try {
    // Get current settings or create if doesn't exist
    const settings = await prisma.globalSettings.upsert({
      where: {
        id: 'default',
      },
      update: {
        votingEnabled: formData.get('enabled') === 'true',
      },
      create: {
        id: 'default',
        votingEnabled: formData.get('enabled') === 'true',
      },
    });

    // Revalidate relevant paths
    revalidatePath('/admin');
    revalidatePath('/vote');

    return { success: !!settings.id };
  } catch (error) {
    console.error("Error toggling voting:", error);
    return { error: "Failed to toggle voting" };
  }
}

export async function getVotingStatus() {
  try {
    const settings = await prisma.globalSettings.findFirst({
      where: {
        id: 'default',
      },
      select:{
        votingEnabled: true,
      }
    });

    console.log('settings', settings);

    return { votingEnabled: settings?.votingEnabled ?? true };
  } catch (error) {
    console.error("Error getting voting status:", error);
    return { votingEnabled: true }; // Default to enabled if error
  }
}