'use client';

import { useEffect, useState } from 'react';
import type { AppState } from '@/types';
import { loadState, saveState } from '@/lib/storage';

export default function AdminPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [message, setMessage] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupTime, setGroupTime] = useState('');
  const [groupStart, setGroupStart] = useState('1');

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) return <main className="panel"><h1>Admin Console</h1><p>Loading event settings...</p></main>;

  function persist(next: AppState, success: string) {
    setState(next);
    saveState(next);
    setMessage(success);
  }

  function updateEvent<K extends keyof AppState['event']>(key: K, value: AppState['event'][K]) {
    setState((current) => current ? { ...current, event: { ...current.event, [key]: value } } : current);
  }

  function saveEventSettings() {
    if (!state) return;
    persist({ ...state }, 'Event settings saved.');
  }

  function editGroup(groupId: string) {
    const group = state.teeGroups.find((item) => item.id === groupId);
    if (!group) return;
    setEditingGroupId(group.id);
    setGroupName(group.name);
    setGroupTime(group.tee_time ?? '');
    setGroupStart(String(group.starting_hole ?? 1));
    setMessage(`Editing ${group.name}.`);
  }

  function addOrUpdateGroup() {
    if (!state || !groupName.trim()) {
      setMessage('Enter a tee group name first.');
      return;
    }
    const next = { ...state };
    if (editingGroupId) {
      next.teeGroups = next.teeGroups.map((group) => group.id === editingGroupId ? {
        ...group,
        name: groupName.trim(),
        tee_time: groupTime || null,
        starting_hole: Number(groupStart) || 1,
      } : group);
      persist(next, 'Tee group updated.');
    } else {
      next.teeGroups = [
        ...next.teeGroups,
        {
          id: `g${Date.now()}`,
          name: groupName.trim(),
          tee_time: groupTime || null,
          starting_hole: Number(groupStart) || 1,
        },
      ];
      persist(next, 'Tee group added.');
    }
    setEditingGroupId(null);
    setGroupName('');
    setGroupTime('');
    setGroupStart('1');
  }

  return (
    <main className="grid">
      <div className="panel">
        <h1>Admin Console</h1>
        <p>Configure event rules, teams, tee groups, and event status.</p>
        {message ? <p>{message}</p> : null}
      </div>
      <div className="grid grid-2">
        <div className="panel">
          <h2>Event Settings</h2>
          <div className="grid">
            <div>
              <label>Event Name</label>
              <input value={state.event.name} onChange={(e) => updateEvent('name', e.target.value)} />
            </div>
            <div>
              <label>Event Date</label>
              <input type="date" value={state.event.event_date} onChange={(e) => updateEvent('event_date', e.target.value)} />
            </div>
            <div>
              <label>Format</label>
              <select value="best_ball" disabled>
                <option value="best_ball">Best Ball (Gross)</option>
              </select>
            </div>
            <div>
              <label>Balls to Count</label>
              <select value={String(state.event.balls_to_count)} onChange={(e) => updateEvent('balls_to_count', Number(e.target.value) as 1 | 2 | 3)}>
                <option value="1">1 Best Ball</option>
                <option value="2">2 Best Balls</option>
                <option value="3">3 Best Balls</option>
              </select>
            </div>
            <div>
              <label>Event Status</label>
              <select value={state.event.status} onChange={(e) => updateEvent('status', e.target.value as AppState['event']['status'])}>
                <option value="draft">Draft</option>
                <option value="live">Live</option>
                <option value="finalized">Finalized</option>
              </select>
            </div>
            <div>
              <label>Skins</label>
              <select value={state.event.skins_enabled ? 'on' : 'off'} onChange={(e) => updateEvent('skins_enabled', e.target.value === 'on')}>
                <option value="on">Individual Gross Skins On</option>
                <option value="off">Skins Off</option>
              </select>
            </div>
            <button className="primary" onClick={saveEventSettings}>Save Event Settings</button>
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
                {state.teeGroups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.tee_time || '-'}</td>
                    <td>{group.starting_hole}</td>
                    <td><button className="secondary" onClick={() => editGroup(group.id)}>Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-3" style={{ marginTop: 16 }}>
            <input placeholder="New tee group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <input type="time" value={groupTime} onChange={(e) => setGroupTime(e.target.value)} />
            <input type="number" min="1" max="18" value={groupStart} onChange={(e) => setGroupStart(e.target.value)} />
          </div>
          <div className="grid grid-2" style={{ marginTop: 12 }}>
            <button className="primary" onClick={addOrUpdateGroup}>{editingGroupId ? 'Update Tee Group' : 'Add Tee Group'}</button>
            <button className="secondary" onClick={() => { setEditingGroupId(null); setGroupName(''); setGroupTime(''); setGroupStart('1'); setMessage('Tee group editor cleared.'); }}>Clear Editor</button>
          </div>
        </div>
      </div>
    </main>
  );
}
