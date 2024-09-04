import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardData  } from "../redux/actions/Dashboard";

function Dashboard() {
  const dispatch = useDispatch();
  const {
    membersCount,
    totalIncome,
    membersPerMonth,
    activityByIncome,
    notifications,
    sportsByMembers,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Miembros</h2>
          <p>Total: {membersCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Pagos</h2>
          <p>Reciente: ${totalIncome}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Actividades</h2>
          <p>Recientes: {membersPerMonth}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Ingresos por Actividad</h2>
          <ul>
            {activityByIncome.map((item, index) => (
              <li key={index} className="py-1">
                {item.sport.name}: ${item.income}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Notificaciones</h2>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="py-1">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow mt-6">
        <h2 className="text-xl font-bold">Miembros por Deporte</h2>
        <ul>
          {sportsByMembers.map((item, index) => (
            <li key={index} className="py-1">
              {item.sport.name}: {item.members} miembros
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
