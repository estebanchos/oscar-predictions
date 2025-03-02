import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Oscar Predictions 2025",
  description: "Admin dashboard for Oscar Predictions 2025",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}