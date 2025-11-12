import { CalendarHeartIcon, PlusIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-primary p-1 rounded-lg">
            <CalendarHeartIcon className="size-10" />
          </div>
          <span className="font-bold text-xl text-foreground">EventHub</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant={"default"} className="gap-2">
              <PlusIcon className="size-4" />
              Crear evento
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
