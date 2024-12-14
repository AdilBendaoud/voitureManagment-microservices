import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ClientList from './components/ClientList';
import CarList from './components/CarList';
import ClientCars from './components/ClientCars';

const App = () => {
  return (
    <Router>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route index path="/clients" element={<ClientList />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/client-cars/:clientId" element={<ClientCars />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
