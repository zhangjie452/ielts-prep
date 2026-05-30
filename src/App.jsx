import { Routes, Route, BrowserRouter } from "react-router-dom";
import { IeltsProvider } from "./context/IeltsContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Speaking from "./pages/Speaking";
import Vocabulary from "./pages/Vocabulary";
import "./index.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content fade-in">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <IeltsProvider>
        <AppLayout />
      </IeltsProvider>
    </BrowserRouter>
  );
}
