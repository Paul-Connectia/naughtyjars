const Header = () => {
    return (
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Admin</span>
          <img
            src=""
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>
    );
  };
  
  export default Header;
  