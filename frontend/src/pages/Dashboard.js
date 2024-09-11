  import React, { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { getDashboardData } from "../redux/actions/Dashboard";
  import { BarChart } from '@mui/x-charts';
  import { Pie } from "react-chartjs-2";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

  ChartJS.register(ArcElement, Tooltip, Legend);

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
      expiringMembersCount,
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
      dispatch(getDashboardData());
    }, [dispatch]);

    console.log('acc', incomeByMonth);
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
    const barChartData = months.map((month, index) => ({
      month,
      members: table[index] || 0,
      income: incomeByMonth[index] || 0, // Usar los ingresos por mes correctos del dashboard
    }));

    const valueFormatter = (value) => `$${value}`;

    // Datos para el gráfico de pastel de Ingresos por Actividad
  const incomeChartData = {
    labels: incomeData.map(item => item.label),
    datasets: [
      {
        data: incomeData.map(item => item.value),
        backgroundColor: ['green', 'blue', 'gray', 'green', 'yellow', 'pink'], // Puedes cambiar los colores aquí
        hoverOffset: 4,
      },
    ],
  };

  // Datos para el gráfico de pastel de Miembros por Deporte
  const membersChartData = {
    labels: membersData.map(item => item.label),
    datasets: [
      {
        data: membersData.map(item => item.value),
        backgroundColor: ['red', 'blue', 'gray', 'lightgreen', 'yellow', 'pink'], // Puedes cambiar los colores aquí
        hoverOffset: 4,
      },
    ],
  };

    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Panel</h1>
        
        {/* Información general */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-4 text-center bg-blue-100 rounded shadow w-[20rem] h-[20rem] ">
        
            <h2 className="text-2xl font-bold mt-20">Miembros</h2>
            <p>Total: {membersCount}</p>
            
          </div>
          <div className="p-4 text-center bg-red-100 rounded shadow  
          w-[20rem] h-[20rem] ">
            <h2 className="text-2xl mt-20 font-bold">Pagos</h2>
            <p>Reciente: ${totalIncome} </p>
          </div>
          <div className="p-4 text-center bg-orange-100 rounded shadow  
          w-[20rem] h-[20rem]">
            <h2 className="text-2xl mt-20 font-bold">Actividades</h2>
            <p>Recientes: {membersPerMonth}</p>
          </div>
          <div className="p-4 text-center bg-orange-100 rounded shadow  
          w-[20rem] h-[20rem]">
            <h2 className="text-2xl mt-20 font-bold">Planes por vencer</h2>
            <p>Recientes: {expiringMembersCount}</p>
          </div>
          
        </div>

        {/* Gráficos de Pie para Ingresos por Actividad y Miembros por Deporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-gray-100 rounded shadow flex">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ingresos por Actividad</h2>
            <Pie data={incomeChartData} width={350} height={350} />
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded shadow flex">
          <div>
            <h2 className="text-2xl font-bold mb-4">Miembros por Deporte</h2>
            <Pie data={membersChartData} width={350} height={350} />
          </div>
        </div>
      </div>      
     

        //Gráfico de Barras para Ingresos y Miembros por Mes 
        <div className="p-4 bg-gray-100 rounded shadow mt-6 flex">
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
