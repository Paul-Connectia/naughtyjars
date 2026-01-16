import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface AdminLayoutProps {
  userRole: "admin" | "crew";
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ userRole }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={userRole} /> {/* pass role to Sidebar */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// const AdminLayout = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
