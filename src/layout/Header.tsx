import { Link, NavLink } from "react-router";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/cartContext";

const menus = [
  { title: "home", href: "/" },
  { title: "products", href: "/products/1" },
  { title: "about us", href: "/about-us" },
  { title: "blogs", href: "/blogs" },
];

export default function Header() {
  const [show, setShow] = useState(false);

  const { state } = useCart();
  const { items } = state;

  // get total count (item * quantity)
  let c: number = 0
  items.forEach(i => { c = c + i.quantity })

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

          <ButtonGroup count={c} />

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

function ButtonGroup({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-5 text-white sm:gap-8">
      <Search strokeWidth={1.5} />
      <Link to={'/login'}>
        <User strokeWidth={1.5} />
      </Link>
      <Link to={'/cart'}>
        <div className="relative">
          <ShoppingBag strokeWidth={1.5} />
          {count > 0 && <span className="absolute -top-1 -right-1 size-4 bg-white rounded-full flex justify-center items-center text-[var(--color-purple)] text-sm">{count}</span>}
        </div>
      </Link>
    </div>
  );
}
