import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardData } from "../redux/actions/Dashboard";
import { PieChart, BarChart } from '@mui/x-charts';

function Dashboard() {
  const dispatch = useDispatch();
  const {
    membersCount,
    totalIncome,
    membersPerMonth,
    activityByIncome,
    notifications,
    sportsByMembers,
    table, // Tabla de miembros por mes
    incomeByMonth, // Ingresos por mes
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  // Función para agrupar datos por actividad
  const groupByActivity = (data, key) => {
    const grouped = data.reduce((acc, item) => {
      const activityName = item.sport.name;
      if (!acc[activityName]) {
        acc[activityName] = { value: 0, label: activityName };
      }
      acc[activityName].value += item[key]; // Sumar ingresos o miembros según la clave
      return acc;
    }, {});

    return Object.values(grouped); // Convertir el objeto en un array
  };

  // Agrupar ingresos por actividad
  const incomeData = groupByActivity(activityByIncome, 'income');
  
  // Agrupar miembros por deporte
  const membersData = groupByActivity(sportsByMembers, 'members');

  // Nombres de los meses
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  // Dataset para el gráfico de barras
  const barChartData = table.map((members, index) => ({
    month: months[index], // Nombres de los meses
    members: members,
    income: incomeByMonth[index], // Usar los ingresos por mes correctos
  }));

  const valueFormatter = (value) => `$${value}`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel</h1>
      
      {/* Información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Miembros</h2>
          <p>Total: {membersCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Pagos</h2>
          <p>Reciente: ${totalIncome} </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">Actividades</h2>
          <p>Recientes: {membersPerMonth}</p>
        </div>
      </div>

      {/* Gráficos de Pie para Ingresos por Actividad y Miembros por Deporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow flex">
          <div>
            <h2 className="text-xl font-bold mb-4">Ingresos por Actividad</h2>
            <PieChart
              series={[{ data: incomeData }]}
              width={350}
              height={350}
            />
          </div>
          <div className="ml-6">
            <h2 className="text-lg font-semibold">Detalles</h2>
            <ul className="mt-2">
              {incomeData.map((item, index) => (
                <li key={index} className="py-1">
                  {item.label}: ${item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 bg-white rounded shadow flex">
          <div>
            <h2 className="text-xl font-bold mb-4">Miembros por Deporte</h2>
            <PieChart
              series={[{ data: membersData }]}
              width={350}
              height={350}
            />
          </div>
          <div className="ml-6">
            <h2 className="text-lg font-semibold">Detalles</h2>
            <ul className="mt-2">
              {membersData.map((item, index) => (
                <li key={index} className="py-1">
                  {item.label}: {item.value} miembros
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras para Ingresos y Miembros por Mes */}
      <div className="p-4 bg-white rounded shadow mt-6 flex">
        <div>
          <h2 className="text-xl font-bold mb-4">Ingresos y Miembros por Mes</h2>
          <BarChart
            dataset={barChartData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'members', label: 'Miembros' },
              { dataKey: 'income', label: 'Ingresos', valueFormatter },
            ]}
            width={400}
            height={300}
          />
        </div>
        <div className="ml-6">
          <h2 className="text-lg font-semibold">Detalles</h2>
          <ul className="mt-2">
            {barChartData.map((item, index) => (
              <li key={index} className="py-1">
                {item.month}: {item.members} miembros, ${item.income} ingresos
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="p-4 bg-white rounded shadow mt-6">
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
  );
}

export default Dashboard;
