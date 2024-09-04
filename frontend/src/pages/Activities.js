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
    <div className="overflow-x-auto">
  <h1 className="text-3xl font-bold mb-6">Actividades</h1>
  <table className="table w-full bg-white rounded shadow">
    {/* head */}
    <thead className='text-2xl'>
      <tr>
        <th>Actividad</th>
        <th>Instructor</th>
        <th>Horario</th>
      </tr>
    </thead>
    <tbody>
      {activities.map((activity) => (
        <tr key={activity.id}>
          <td>{activity.name}</td>
          <td>{activity.instructor}</td>
          <td>{activity.schedule}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default Activities;
