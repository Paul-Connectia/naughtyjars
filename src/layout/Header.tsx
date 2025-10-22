import { Link, NavLink } from "react-router";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useState } from "react";

const menus = [
  { title: "home", href: "/" },
  { title: "about us", href: "/about-us" },
  { title: "blogs", href: "/blogs" },
];

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <header className="bg-[url('/nav-bg.webp')]">
      <div className="flex items-center justify-between gap-5 px-5 py-5">
        <Link to="/">
          <img
            src="/logo-white.png"
            className="h-auto w-32 object-contain"
            alt="logo"
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-10 sm:flex">
            {menus.map((m) => (
              <NavLink to={m.href} className="text-lg text-white" key={m.title}>
                {m.title}
              </NavLink>
            ))}
          </nav>

          <ButtonGroup />

          <button
            className="cursor-pointer text-white sm:hidden"
            onClick={() => setShow(!show)}
          >
            {show ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* mobile menus */}

      {show && (
        <div className="flex flex-col items-center justify-center gap-5 pb-5">
          {menus.map((m) => (
            <NavLink to={m.href} className="text-lg text-white" key={m.title}>
              {m.title}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

function ButtonGroup() {
  return (
    <div className="flex items-center gap-5 text-white sm:gap-8">
      <Search strokeWidth={1.5} />
      <User strokeWidth={1.5} />
      <ShoppingBag strokeWidth={1.5} />
    </div>
  );
}
