import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Crew List", path: "/admin/crew" },
    { name: "Add Crew", path: "/admin/crew/add" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-2xl font-bold border-b">Admin Panel</div>
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block px-4 py-2 rounded-lg ${
                  pathname === link.path
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
