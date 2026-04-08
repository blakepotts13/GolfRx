export default function LoginPage() {
  return (
    <main className="panel">
      <h1>Login</h1>
      <p>Magic-link authentication placeholder for Supabase Auth.</p>
      <div className="grid grid-2">
        <div>
          <label>Email</label>
          <input placeholder="you@example.com" />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button className="primary">Send Magic Link</button>
        </div>
      </div>
    </main>
  );
}
