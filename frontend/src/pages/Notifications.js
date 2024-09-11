import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../redux/actions/Notifications'; // Asegúrate de tener la acción configurada

function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications()); // Despachar la acción para traer notificaciones
  }, [dispatch]);

  if (loading) {
    return <div>Cargando notificaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar notificaciones: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notificaciones</h1>
      <div className="p-4 bg-gray-100 rounded shadow">
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li key={notification._id} className="border-b pb-4">
                <p className="text-lg font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  Fecha de notificación: {new Date(notification.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay notificaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
