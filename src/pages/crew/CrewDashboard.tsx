import React from "react";

const CrewDashboard: React.FC = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Crew Dashboard</h1>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default CrewDashboard;
