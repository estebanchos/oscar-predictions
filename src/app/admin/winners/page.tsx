import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Award, CheckCircle, ChevronLeft, Edit } from "lucide-react";

export default async function WinnersPage() {
  // For simplicity, we're using the first admin user
  // In a real application, you would use authentication
  const adminUser = await prisma.user.findFirst({
    where: { isAdmin: true },
  });

  // If no admin user exists, redirect to the home page
  if (!adminUser) {
    redirect("/");
  }

  // Fetch all categories with nominees and winners
  const categories = await prisma.category.findMany({
    include: {
      nominees: true,
      winner: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-brand-primary">Manage Winners</h1>
        <p className="text-lg text-muted-foreground">
          Set or update winners for each category as they are announced
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-brand-primary flex items-center gap-2">
            <Award className="h-5 w-5" />
            Oscar Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Winner</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    {category.winnerId ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Winner Set</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No winner yet</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {category.winner ? category.winner.name : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/winners/${category.id}`}>
                      <Button variant="ghost" size="sm" className="text-brand-secondary">
                        <Edit className="h-4 w-4 mr-1" />
                        {category.winnerId ? "Update" : "Set Winner"}
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}