import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
        <Link to="/" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
        <Link to="/plans" className="hover:bg-blue-700 p-2 rounded">Plans</Link>
        <Link to="/coupons" className="hover:bg-blue-700 p-2 rounded">Coupons</Link>
        <Link to="/stores" className="hover:bg-blue-700 p-2 rounded">Stores</Link>
        <Link to="/settings" className="hover:bg-blue-700 p-2 rounded">Settings</Link>
      </div>

      {/* Page content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
