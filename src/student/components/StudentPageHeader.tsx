interface StudentPageHeaderProps {
  title: string;
  subtitle?: string;
}

export function StudentPageHeader({ title, subtitle }: StudentPageHeaderProps) {
  return (
    <header className="student-page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
