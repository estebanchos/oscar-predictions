export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Oscar Predictions. All rights reserved.</p>
          <p>
            This is not affiliated with the Academy of Motion Picture Arts and Sciences.
          </p>
        </div>
      </div>
    </footer>
  );
}