import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Weekend Tournament Beta v1',
  description: 'Hosted beta starter for live golf tournaments'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/scoring">Scoring</Link>
            <Link href="/login">Login</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
