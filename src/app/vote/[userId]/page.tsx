import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VotingDashboard } from "@/components/vote/voting-dashboard";
import { sortCategoriesByOrder } from "@/lib/utils";

interface UserVotingPageProps {
  params: Promise< {
    userId: string;
  }>;
}

export default async function UserVotingPage({ params }: UserVotingPageProps) {
  const { userId } = await params;

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If user doesn't exist, 404
  if (!user) {
    notFound();
  }

  // If user is admin, redirect to admin
  if (user.isAdmin) {
    redirect("/admin");
  }

  // Fetch all categories
  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
    },
  });

  // Fetch user's votes
  const votes = await prisma.vote.findMany({
    where: {
      userId,
    },
    include: {
      category: true,
      nominee: true,
    },
  });

  // Get list of category IDs that the user has already voted on
  const votedCategoryIds = votes.map((vote) => vote.categoryId);

  // Sort categories by order
  const sortedCategories = sortCategoriesByOrder(categories);

  // Find the next category that needs a vote
  const nextCategory = sortedCategories.find(
    (category) => !votedCategoryIds.includes(category.id)
  );

  // If all categories have been voted on, redirect to completion page
  if (!nextCategory && votedCategoryIds.length === sortedCategories.length) {
    redirect(`/vote/${userId}/complete`);
  }

  return (
    <VotingDashboard
      user={user}
      categories={sortedCategories}
      votes={votes}
      nextCategory={nextCategory}
    />
  );
}