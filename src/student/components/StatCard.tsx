interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`student-stat${accent ? ' student-stat--accent' : ''}`}>
      <div className="student-stat__label">{label}</div>
      <div className="student-stat__value">{value}</div>
      {sub && <div className="student-stat__sub">{sub}</div>}
    </div>
  );
}
