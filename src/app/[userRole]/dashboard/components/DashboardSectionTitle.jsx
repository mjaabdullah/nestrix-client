"use client";

export default function DashboardSectionTitle({ title, subtitle }) {
  return (
    <div className="flex flex-col">
      {title && (
        <h1 className="text-xl font-semibold text-foreground tracking-tight leading-snug">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
