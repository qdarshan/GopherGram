import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="p-2 bg-white flex justify-between gap-2 shadow">
      <nav className="flex flex-row w-full">
        <div className="basis-2/12 sm:basis-3/12 ">
          <div className="text-orange-600 font-extrabold ">
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
