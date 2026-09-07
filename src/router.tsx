import { createBrowserRouter, Navigate } from "react-router-dom";

import { App } from "./App";
import { CalculoEstaturaEstimada } from "./pages/CalculoEstaturaEstimada";
import { NecessidadesCaloricas } from "./pages/NecessidadesCaloricas";
import { appRoutes } from "./routes";

const routeElements = {
  "/calculo-estatura-estimada": <CalculoEstaturaEstimada />,
  "/necessidades-caloricas": <NecessidadesCaloricas />,
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/calculo-estatura-estimada" />,
      },
      ...appRoutes.map((route) => ({
        path: route.path,
        element: routeElements[route.path],
      })),
    ],
  },
]);
