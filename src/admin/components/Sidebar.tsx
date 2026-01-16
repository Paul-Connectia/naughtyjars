import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  userRole: "admin" | "crew";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Only show links for admin, crew sees only Dashboard
  const links = [
    { name: "Dashboard", path: "/admin" },
    ...(userRole === "admin"
      ? [
          { name: "Crew List", path: "/admin/crew" },
          { name: "Add Crew", path: "/admin/crew/add" },
          { name: "Settings", path: "/admin/settings" },
        ]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-md h-full flex flex-col justify-between">
      <div>
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
      </div>

      {/* Logout button at bottom */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;



// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const { pathname } = useLocation();

//   const links = [
//     { name: "Dashboard", path: "/admin" },
//     { name: "Crew List", path: "/admin/crew" },
//     { name: "Add Crew", path: "/admin/crew/add" },
//     { name: "Settings", path: "/admin/settings" },
//   ];

//   return (
//     <aside className="w-64 bg-white shadow-md h-full">
//       <div className="p-4 text-2xl font-bold border-b">Admin Panel</div>
//       <nav className="p-4">
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li key={link.path}>
//               <Link
//                 to={link.path}
//                 className={`block px-4 py-2 rounded-lg ${
//                   pathname === link.path
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-blue-100"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
