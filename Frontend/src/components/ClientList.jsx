import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {FaTimes } from 'react-icons/fa';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({ nom: '', age: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [clientCars, setClientCars] = useState([]);
  const [clientName, setClientName] = useState("");

  // Fetch clients from the API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    api.get('/clients')
      .then(response => {
        setClients(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError('Erreur lors de la récupération des clients.');
      });
  };

  // Fetch cars for a selected client
  const fetchClientCars = (clientId, clientName) => {
    api.get(`/voitures/client/${clientId}`)
      .then(response => {
        setClientCars(response.data);
        setClientName(clientName);
        setModalOpen(true);
      })
      .catch(error => {
        console.error('Error fetching client cars:', error);
        setError("Erreur lors de la récupération des voitures du client.");
      });
  };

  // Add a new client
  const handleAddClient = (e) => {
    e.preventDefault();
    api.post('/clients', newClient)
      .then(response => {
        setClients([...clients, response.data]); // Add the new client to the list
        setNewClient({ nom: '', age: '' }); // Reset the form
      })
      .catch(error => {
        console.error('Error adding client:', error);
        setError('Erreur lors de l’ajout du client.');
      });
  };

  // Delete a client
  const handleDeleteClient = (clientId) => {
    api.delete(`/clients/${clientId}`)
      .then(() => {
        setClients(clients.filter(client => client.id !== clientId));
      })
      .catch(error => {
        console.error('Error deleting client:', error);
        setError('Erreur lors de la suppression du client.');
      });
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setClientCars([]);
    setClientName("");
  };

  return (
    <div className="p-8">
      <form onSubmit={handleAddClient} className="bg-white shadow-lg p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Nom"
            value={newClient.nom}
            onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            placeholder="Âge"
            value={newClient.age}
            onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition shadow-md"
          >Ajouter
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && <div className="text-red-500 font-semibold mb-6">{error}</div>}

      {/* Client table */}
      {!error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Âge</th>
                <th className="px-6 py-4 text-center text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{client.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{client.nom}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{client.age}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => fetchClientCars(client.id, client.nom)}
                      className="bg-blue-600 mr-4 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
                    >Voir Voitures
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition shadow-md"
                    >Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Client Cars */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-600">Voitures de {clientName}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {clientCars.length > 0 ? (
                clientCars.map(car => (
                  <div key={car.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {car.marque} {car.modele}
                    </h3>
                    <p className="text-gray-600">Matricule: {car.matricule}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Aucune voiture trouvée pour ce client.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
