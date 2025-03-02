import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={'/oscar-logo.png'} alt="Oscar Predictions 2025" width={50} height={50} />
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