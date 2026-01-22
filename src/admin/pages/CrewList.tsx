import { useEffect, useState } from "react";
import { deleteCrew, getAllCrew } from "@/api/crewApi";
import { Link } from "react-router";

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
      "Are you sure you want to delete this crew?",
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
      <h2 className="mb-4 text-2xl font-bold">Crew List</h2>
      <div className="flex justify-end">
      <Link
        to="/admin/crew/add"
        className=" rounded bg-[#75398f] px-4 py-2 text-white hover:bg-[#f5deff] hover:text-[#75398f] "
      >
        + Add New Crew
      </Link>
      </div>
      <table className="mt-10 w-full border-collapse overflow-hidden rounded-lg bg-white shadow">
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
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
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
