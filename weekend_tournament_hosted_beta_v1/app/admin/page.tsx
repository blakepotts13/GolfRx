import { sampleEvent, teeGroups } from '@/lib/mockData';

export default function AdminPage() {
  return (
    <main className="grid">
      <div className="panel">
        <h1>Admin Console</h1>
        <p>Configure event rules, teams, tee groups, and event status.</p>
      </div>
      <div className="grid grid-2">
        <div className="panel">
          <h2>Event Settings</h2>
          <div className="grid">
            <div>
              <label>Event Name</label>
              <input defaultValue={sampleEvent.name} />
            </div>
            <div>
              <label>Event Date</label>
              <input type="date" defaultValue={sampleEvent.event_date} />
            </div>
            <div>
              <label>Format</label>
              <select defaultValue="best_ball">
                <option value="best_ball">Best Ball (Gross)</option>
              </select>
            </div>
            <div>
              <label>Balls to Count</label>
              <select defaultValue={String(sampleEvent.balls_to_count)}>
                <option value="1">1 Best Ball</option>
                <option value="2">2 Best Balls</option>
                <option value="3">3 Best Balls</option>
              </select>
            </div>
            <div>
              <label>Event Status</label>
              <select defaultValue={sampleEvent.status}>
                <option value="draft">Draft</option>
                <option value="live">Live</option>
                <option value="finalized">Finalized</option>
              </select>
            </div>
            <div>
              <label>Skins</label>
              <select defaultValue={sampleEvent.skins_enabled ? 'on' : 'off'}>
                <option value="on">Individual Gross Skins On</option>
                <option value="off">Skins Off</option>
              </select>
            </div>
            <button className="primary">Save Event Settings</button>
          </div>
        </div>
        <div className="panel">
          <h2>Tee Group Manager</h2>
          <p>Players can score only their tee group. Tee group is separate from team.</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Group</th><th>Tee Time</th><th>Starting Hole</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {teeGroups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.tee_time}</td>
                    <td>{group.starting_hole}</td>
                    <td><button className="secondary">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-3" style={{ marginTop: 16 }}>
            <input placeholder="New tee group name" />
            <input type="time" />
            <button className="primary">Add Tee Group</button>
          </div>
        </div>
      </div>
    </main>
  );
}
