import { AuditEntry } from '@/types';

export default function AuditTable({ entries }: { entries: AuditEntry[] }) {
  return (
    <div className="card">
      <div className="section-title">Score Audit Trail</div>
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Hole</th>
            <th>Previous</th>
            <th>New</th>
            <th>Entered By</th>
            <th>UTC Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.teamId}</td>
              <td>{entry.hole}</td>
              <td>{entry.previousScore ?? '-'}</td>
              <td>{entry.newScore}</td>
              <td>{entry.enteredBy}</td>
              <td className="code">{entry.enteredAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
