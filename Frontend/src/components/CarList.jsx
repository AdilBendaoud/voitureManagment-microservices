import React, { useState, useEffect } from "react";
import api from "../services/api";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({
    marque: "",
    modele: "",
    matricule: "",
    clientId: "",
  });

  // Fetch cars and clients from the API
  useEffect(() => {
    fetchCars();
    fetchClients();
  }, []);

  const fetchCars = () => {
    api
      .get("/voitures")
      .then((response) => {
        setCars(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setError("Erreur lors de la récupération des voitures.");
      });
  };

  const fetchClients = () => {
    api
      .get("/clients")
      .then((response) => {
        setClients(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
        setError("Erreur lors de la récupération des clients.");
      });
  };

  // Add a new car
  const handleAddCar = (e) => {
    e.preventDefault();
    if (!newCar.clientId) {
      alert("Veuillez sélectionner un client.");
      return;
    }
    api
      .post(`/voitures/${newCar.clientId}`, newCar)
      .then((response) => {
        setCars([...cars, response.data]);
        setNewCar({ marque: "", modele: "", matricule: "", clientId: "" });
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        setError("Erreur lors de l’ajout de la voiture.");
      });
  };

  // Delete a car
  const handleDeleteCar = (carId) => {
    api
      .delete(`/voitures/${carId}`)
      .then(() => {
        setCars(cars.filter((car) => car.id !== carId));
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
        setError("Erreur lors de la suppression de la voiture.");
      });
  };

  return (
    <div className="p-8">
      <form
        onSubmit={handleAddCar}
        className="bg-white shadow-lg p-6 rounded-lg mb-8"
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Marque"
            value={newCar.marque}
            onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Modèle"
            value={newCar.modele}
            onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Matricule"
            value={newCar.matricule}
            onChange={(e) =>
              setNewCar({ ...newCar, matricule: e.target.value })
            }
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={newCar.clientId}
            onChange={(e) => setNewCar({ ...newCar, clientId: e.target.value })}
            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nom}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && <div className="text-red-500 font-medium mb-6">{error}</div>}

      {/* Car table */}
      {!error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-bold">
                  Marque
                </th>
                <th className="px-6 py-4 text-left text-lg font-bold">
                  Modèle
                </th>
                <th className="px-6 py-4 text-left text-lg font-bold">
                  Matricule
                </th>
                <th className="px-6 py-4 text-left text-lg font-bold">
                  Propriétaire
                </th>
                <th className="px-6 py-4 text-center text-lg font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr
                  key={car.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-gray-800">{car.marque}</td>
                  <td className="px-6 py-4 text-gray-800">{car.modele}</td>
                  <td className="px-6 py-4 text-gray-800">{car.matricule}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {car.client ? car.client.nom : "Inconnu"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteCar(car.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarList;
