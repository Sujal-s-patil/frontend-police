import React, { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "16px",
        transition: "all 0.3s",
        width: collapsed ? "60px" : "20%",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        {!collapsed && <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Dashboard</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "20px"
          }}
        >
          {collapsed ? "☰" : "✖"}
        </button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* <SidebarItem icon="📊" label="Dashboard" collapsed={collapsed} /> */}
        <SidebarItem icon="👥" label="Users" collapsed={collapsed} />
        <SidebarItem icon="⚙️" label="Settings" collapsed={collapsed} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "8px",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#333",
      }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
      {!collapsed && <span style={{ fontSize: "16px" }}>{label}</span>}
    </div>
  );
};

export default Sidebar;
