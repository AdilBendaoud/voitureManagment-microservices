import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { FaCarAlt } from 'react-icons/fa';

const ClientCars = () => {
  const { clientId } = useParams();
  const [cars, setCars] = useState([]);
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch client details
    api.get(`/clients/${clientId}`)
      .then(response => {
        setClient(response.data);
      })
      .catch(() => {
        setError("Erreur lors de la récupération des informations du client.");
      });

    // Fetch cars for the client
    api.get(`/voitures/client/${clientId}`)
      .then(response => {
        setCars(response.data || []); // Default to an empty array
        setError(null);
      })
      .catch(() => {
        setError("Erreur lors de la récupération des voitures du client.");
      });
  }, [clientId]);

  return (
    <div>
      {client && (
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Voitures de {client.nom}
        </h2>
      )}
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : cars.length === 0 ? (
        <div className="text-gray-600 font-semibold">
          {client ? `${client.nom} n'a pas de voitures.` : 'Aucune voiture trouvée.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div
              key={car.id}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-bold">
                <FaCarAlt className="inline text-blue-600 mr-2" />
                {car.marque} {car.modele}
              </h3>
              <p className="text-gray-600">Matricule: {car.matricule}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientCars;
