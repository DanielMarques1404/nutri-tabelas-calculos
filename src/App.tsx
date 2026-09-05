import { Outlet } from "react-router-dom";

import { Header } from "./components/layout/Header";
import { appRoutes } from "./routes";

export function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Header routes={appRoutes} />
      <main className="flex flex-col items-center mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
