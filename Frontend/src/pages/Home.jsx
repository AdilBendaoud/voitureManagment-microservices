import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/hero-bg.jpg)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Bienvenue au Cars&Client</h1>
          <p className="text-lg mb-8">Gérez facilement vos clients et leurs voitures.</p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/clients"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-lg"
            >
              Gérer les Clients
            </Link>
            <Link
              to="/cars"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-lg"
            >
              Gérer les Voitures
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
