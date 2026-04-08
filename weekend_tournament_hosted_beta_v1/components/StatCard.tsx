export default function StatCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="card stack">
      <div className="muted">{label}</div>
      <div className="kpi">{value}</div>
      {note ? <div className="muted">{note}</div> : null}
    </div>
  );
}
