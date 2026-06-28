interface AdminStatProps {
  label: string;
  value: string | number;
  accent?: boolean;
}

export function AdminStat({ label, value, accent }: AdminStatProps) {
  return (
    <div className={`admin-stat${accent ? ' admin-stat--accent' : ''}`}>
      <div className="admin-stat__label">{label}</div>
      <div className="admin-stat__value">{value}</div>
    </div>
  );
}
