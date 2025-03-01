import Link from "next/link";
import { Award } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-brand-primary" />
            <span className="font-bold text-xl text-brand-primary">Oscar Predictions 2025</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-brand-primary transition-colors">
              Home
            </Link>
            <Link href="/vote" className="text-sm font-medium hover:text-brand-primary transition-colors">
              Vote
            </Link>
            <Link href="/results" className="text-sm font-medium hover:text-brand-primary transition-colors">
              Results
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}