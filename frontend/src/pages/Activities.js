import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulación de obtener datos de la API
    api.get('/activities')
      .then(response => setActivities(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-6 ml-4">Actividades</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {activities?.map((activity) => (
        <div key={activity.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold mb-2 p-4">{activity.name}</h2>
          <div className="p-4">
            <p className="text-gray-700 mb-1"><strong>Instructor:</strong> {activity.instructor}</p>
            <p className="text-gray-700"><strong>Horario:</strong> {activity.schedule}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Activities;