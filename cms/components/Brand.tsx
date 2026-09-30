/** Admin branding — the logo mark in the red/black/white brand colours. Replace with the official logo. */
export function AdminIcon() {
  return (
    <svg viewBox="0 0 44 44" width="26" height="26" aria-hidden="true">
      <rect width="44" height="44" fill="#C8102E" />
      <path d="M10 32V21l12-10 12 10v11" fill="none" stroke="#fff" strokeWidth="3" />
      <rect x="19" y="24" width="6" height="8" fill="#fff" />
    </svg>
  );
}

export function AdminLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <AdminIcon />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 800, letterSpacing: "0.08em", fontSize: 18 }}>REDSTONE HOMES</div>
        <div style={{ fontSize: 12, opacity: 0.6, letterSpacing: "0.12em", textTransform: "uppercase" }}>Website admin</div>
      </div>
    </div>
  );
}
