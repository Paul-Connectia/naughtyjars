import React, { useState } from "react";

const Setting: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(e.target.checked);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="flex items-center gap-3">
        <label htmlFor="darkMode" className="font-medium">
          Dark Mode:
        </label>
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={handleToggle}
          className="w-5 h-5 accent-indigo-600"
        />
      </div>

      <p className="mt-4 text-gray-600">
        Dark mode is <strong>{darkMode ? "enabled" : "disabled"}</strong>.
      </p>
    </div>
  );
};

export default Setting;
