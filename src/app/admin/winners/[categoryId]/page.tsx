import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { WinnerForm } from "@/components/admin/winner-form";

interface CategoryWinnerPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export default async function CategoryWinnerPage({ params }: CategoryWinnerPageProps) {
  const { categoryId } = await params;

  // For simplicity, we're using the first admin user
  // In a real application, you would use authentication
  const adminUser = await prisma.user.findFirst({
    where: { isAdmin: true },
  });

  // If no admin user exists, redirect to the home page
  if (!adminUser) {
    redirect("/");
  }

  // Fetch category with nominees and winner
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      nominees: true,
      winner: true,
    },
  });

  // If category doesn't exist, 404
  if (!category) {
    notFound();
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/admin/winners">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Winners
          </Button>
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-brand-primary">Set Winner</h1>
        <p className="text-lg text-muted-foreground">
          {category.name}
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-brand-primary">
            {category.winnerId 
              ? `Update winner for ${category.name}` 
              : `Set winner for ${category.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WinnerForm 
            category={category} 
            currentWinnerId={category.winnerId || ""} 
          />
        </CardContent>
      </Card>
    </div>
  );
}