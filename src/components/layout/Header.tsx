import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

type HeaderProps = {
  routes: readonly {
    path: string;
    label: string;
  }[];
};

export const Header = ({routes }: HeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex w-full flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-2" aria-label="Navegacao principal">
          {routes.map((route) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950",
                  isActive && "bg-slate-950 text-white hover:bg-slate-900 hover:text-white",
                )
              }
              key={route.path}
              to={route.path}
            >
              {route.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
