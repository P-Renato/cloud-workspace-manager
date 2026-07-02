import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2>Cloud Workspace Manager</h2>
      </header>

      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}