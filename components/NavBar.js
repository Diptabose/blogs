import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="sticky top-0">
      <nav className="flex w-full justify-around  ">
        <div className="flex-1 bg-gray-700 px-2 py-2">
          <h1 className="text-3xl font-bold text-blue-500">Hunting Coder</h1>
          <span className="text-white">A blog for a hunting coder from hunting coders</span>
        </div>
        <div className="flex items-center justify-evenly flex-1 bg-blue-200 text-lg">
          <Link href="/">
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">Home</span>
          </Link>
          <Link href="/blogs">
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">Blogs</span>
          </Link>
          <Link href="/contact">
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">Contact</span>
          </Link>
          <Link href="/about">
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">About</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
