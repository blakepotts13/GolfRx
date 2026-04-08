import type { EventRecord } from '@/types';

export function EventSummary({ event }: { event: EventRecord }) {
  return (
    <div className="panel">
      <h1>{event.name}</h1>
      <p>
        {event.event_date} · Status <span className="badge">{event.status}</span>
      </p>
      <div className="grid grid-3">
        <div>
          <div className="small">Format</div>
          <div className="kpi">Gross Best Ball</div>
        </div>
        <div>
          <div className="small">Balls Counting</div>
          <div className="kpi">{event.balls_to_count}</div>
        </div>
        <div>
          <div className="small">Individual Skins</div>
          <div className="kpi">{event.skins_enabled ? 'On' : 'Off'}</div>
        </div>
      </div>
    </div>
  );
}
