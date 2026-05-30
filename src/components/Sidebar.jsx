import { NavLink, useLocation } from "react-router-dom";
import { useIeltsState, useIeltsDispatch } from "../context/IeltsContext";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/",           icon: "📊", label: "学习仪表盘" },
  { to: "/listening",  icon: "🎧", label: "听力训练" },
  { to: "/reading",    icon: "📖", label: "阅读理解" },
  { to: "/writing",    icon: "✍️", label: "写作训练" },
  { to: "/speaking",   icon: "💬", label: "口语训练" },
  { to: "/vocabulary", icon: "📝", label: "词汇语法" },
];

export default function Sidebar() {
  const { darkMode } = useIeltsState();
  const dispatch = useIeltsDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setMobileOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const sidebarClasses = `sidebar${mobileOpen ? " open" : ""}`;

  return (
    <>
      {/* Mobile header */}
      <header className="mobile-header">
        <span className="brand">📚 雅思备考</span>
        <button className="menu-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="菜单">
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Overlay */}
      <div className={`sidebar-overlay${mobileOpen ? " show" : ""}`} onClick={() => setMobileOpen(false)} />

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="sidebar-logo">
          <span className="logo-icon">📚</span>
          <span>IELTS Prep</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="btn btn-outline btn-sm"
            style={{ width: "100%" }}
            onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          >
            {darkMode ? "☀️ 浅色模式" : "🌙 深色模式"}
          </button>

          <button
            className="btn btn-outline btn-sm"
            style={{ width: "100%" }}
            onClick={() => {
              const data = JSON.stringify(localStorage.getItem("ielts_app_data"));
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "ielts_backup.json"; a.click();
              URL.revokeObjectURL(url);
            }}
          >
            📥 导出数据
          </button>
        </div>
      </aside>
    </>
  );
}
