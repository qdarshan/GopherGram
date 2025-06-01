import { Link } from "@tanstack/react-router";
import { MoonIcon, SunIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/lib/UseTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4 bg-background text-foreground shadow-sm sticky top-0 z-10"> {/* Added sticky and z-index */}
      <nav className="flex items-center gap-4 w-full max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center text-orange-600 font-bold text-xl">
            Fyr
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-border bg-input px-8 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            aria-label="Search"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to="/login"
            className="text-sm font-medium hover:underline text-muted-foreground"
          >
            Login
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={theme === "dark" ? "Toggle light mode" : "Toggle dark mode"}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}