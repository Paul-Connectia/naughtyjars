import { getAllCrew } from "@/api/crewApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalCrews, setTotalCrews] = useState(0);

  useEffect(() => {
    const fetchCrewCount = async () => {
      try {
        const crewList = await getAllCrew();
        setTotalCrews(crewList.length); // total number of crew
      } catch (error) {
        console.error("Failed to fetch crew:", error);
      }
    };

    fetchCrewCount();
  }, []);

    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Total Crews</p>
            <p className="text-3xl font-bold mt-2">{totalCrews}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Active Jobs</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Pending Approvals</p>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  