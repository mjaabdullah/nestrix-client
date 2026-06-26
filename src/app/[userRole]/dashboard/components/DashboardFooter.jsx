"use client";

export default function DashboardFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 lg:px-8 py-3 flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        &copy; {year} Nestrix. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Privacy
        </a>
        <a
          href="#"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Support
        </a>
      </div>
    </footer>
  );
}
