interface DashboardHeaderProps {
  userId?: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  userId,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        height: "8em",
        marginBottom: 32,
      }}
    >
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        marginBottom: 32,
      }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          Cloud Workspace Manager
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          User ID: {userId}
        </p>
      </div>

      <button onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}