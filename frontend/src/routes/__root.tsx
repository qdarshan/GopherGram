import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Header />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
