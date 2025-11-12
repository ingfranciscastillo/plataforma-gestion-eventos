import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { TanStackRouterDevtoolsInProd } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="py-20 px-10">
        <Outlet />
        <TanStackRouterDevtoolsInProd />
      </main>
    </React.Fragment>
  );
}
