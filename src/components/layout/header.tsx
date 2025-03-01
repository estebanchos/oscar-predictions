import Link from "next/link";
import { Award } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            <span className="font-bold text-xl">Oscar Predictions 2025</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/vote" className="text-sm font-medium hover:underline">
              Vote
            </Link>
            <Link href="/results" className="text-sm font-medium hover:underline">
              Results
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}