import { useTheme } from "@/lib/ThemeProvider";
import { Link } from "@tanstack/react-router";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-2 bg-white flex justify-between gap-2 shadow">
      <nav className="flex flex-row w-full">
        <div className="basis-2/12 sm:basis-3/12 ">
          <div className="text-orange-600 font-bold text-xl">
            <Link to="/">Fyr</Link>
          </div>
        </div>
        <div className="basis-7/12 sm:basis-6/12">
          <input type="text" className="w-full shadow" placeholder="search" />
        </div>
        <div className="basis-3/12 sm:basis-3/12">
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-accent"
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </button>
      </nav>
    </header>

    // <header className="p-2 flex gap-2 bg-white text-black justify-between items-center shadow">
    //   <nav className="flex flex-row">
    //     <div className="flex justify-center gap-2">
    //       <div className="px-2 font-bold">
    //         <Link to="/">Fyr</Link>
    //       </div>
    //     </div>
    //     <div className="search">
    //       <input
    //         type="text"
    //         placeholder="Search"
    //         className=""
    //       />
    //     </div>
    //     <div>
    //       <div className="px-2 font-bold text-red-700">
    //         <Link to="/login">Login</Link>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
}
