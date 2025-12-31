import { Link, NavLink,useNavigate } from "react-router";
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
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const { state } = useCart();
  const { items } = state;
  const navigate = useNavigate();

  // get total count (item * quantity)
  let c: number = 0
  items.forEach(i => { c = c + i.quantity })

  // Toggle search input
  const toggleSearch = () => setSearchActive(prev => !prev);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    // Redirect to products page with query param
    navigate(`/products/1?search=${encodeURIComponent(searchText)}`);
    setSearchText("");
    setSearchActive(false);
  };

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

          <ButtonGroup
            count={c}
            toggleSearch={toggleSearch}
            searchActive={searchActive}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearchSubmit={handleSearchSubmit}
          />

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

function ButtonGroup({
  count,
  toggleSearch,
  searchActive,
  searchText,
  setSearchText,
  handleSearchSubmit
}: {
  count: number;
  toggleSearch: () => void;
  searchActive: boolean;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="flex items-center gap-5 text-white sm:gap-8">
      {/* Search */}
      <div className="flex items-center gap-5 relative">
        <div className="relative">
          <button onClick={toggleSearch} className="mt-2">
            <Search strokeWidth={1.5} className="text-white" />
          </button>
          {searchActive && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute top-full
                left-1/2 -translate-x-1/2
                w-[90vw] max-w-xs
                sm:left-auto sm:right-0 sm:translate-x-0 sm:w-64
                flex gap-2 rounded bg-white p-1 shadow-lg"
              >
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
                className="w-full rounded px-2 text-black"
                placeholder="Search products..."
              />
              <button
                type="submit"
                className="rounded bg-[url('/nav-bg.webp')] px-3 text-white"
              >
                Go
              </button>
            </form>
          )}
        </div>
      </div>

      {/* User */}
      <Link to={'/login'}>
        <User strokeWidth={1.5} />
      </Link>

      {/* Cart */}
      <Link to={'/cart'}>
        <div className="relative">
          <ShoppingBag strokeWidth={1.5} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 size-4 bg-white rounded-full flex justify-center items-center text-[var(--color-purple)] text-sm">
              {count}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}