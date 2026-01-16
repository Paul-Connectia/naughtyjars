import { useEffect, useState } from "react";
import { deleteCrew, getAllCrew } from "@/api/crewApi";

interface Crew {
  _id: string;
  name: string;
  position: string;
}

const CrewList = () => {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const data = await getAllCrew();
        setCrews(data);
      } catch (error) {
        console.error("Failed to fetch crew:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrew();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this crew?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCrew(id);

      // remove from UI
      setCrews((prev) => prev.filter((crew) => crew._id !== id));
    } catch (error) {
      console.error("Failed to delete crew:", error);
      alert("Failed to delete crew");
    }
  };

  if (loading) {
    return <p>Loading crew...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Crew List</h2>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {crews.map((crew, index) => (
            <tr key={crew._id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{crew.name}</td>
              <td className="p-3">{crew.position}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(crew._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewList;
