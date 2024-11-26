import React from "react";
import Link from "next/link";

function TopNav() {
  return (
    <header className="w-full p-2 bg-secondary-foreground">
      <nav>
        <ul className="list-none flex flex-row flex-wrap gap-4 mr-0">
          <li>
            <Link href="/editor">create</Link>
          </li>
          <li>
            <Link href="/">main</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default TopNav;
