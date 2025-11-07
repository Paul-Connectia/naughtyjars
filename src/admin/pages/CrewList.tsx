const CrewList = () => {
    const crews = [
      { id: 1, name: "John Doe", role: "Driver" },
      { id: 2, name: "Alice Smith", role: "Mechanic" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Crew List</h2>
        <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {crews.map((crew) => (
              <tr key={crew.id} className="border-t">
                <td className="p-3">{crew.id}</td>
                <td className="p-3">{crew.name}</td>
                <td className="p-3">{crew.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CrewList;
  