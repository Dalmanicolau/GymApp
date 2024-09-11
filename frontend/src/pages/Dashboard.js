  import React, { useEffect, useContext } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { getDashboardData } from "../redux/actions/Dashboard";
  import { BarChart } from '@mui/x-charts';
import { FaPeopleGroup, FaMoneyBillTrendUp } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { RiPassExpiredFill } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
  import { Pie } from "react-chartjs-2";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

  ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
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
    totalActivity,
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
     <h1 className="text-3xl font-bold mb-6">
        {user ? `¡Hola ${user.username}, bienvenido de vuelta!` : 'Hola, bienvenido de vuelta!'}
      </h1>
      
      {/* Información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="p-4 text-center bg-sky-400 rounded shadow  w-[20rem] h-[20rem] ">
        <FaPeopleGroup className="w-20 h-20 text-sky-700 mx-[6.5rem] mt-16"/>
          <h2 className="text-3xl font-extrabold font-sans text-sky-700">Miembros</h2>
          <p className="text-sky-700 font-semibold text-xl">Total: {membersCount}</p>
        </div>
        <div className="p-4 text-center bg-amber-300 rounded shadow  
        w-[20rem] h-[20rem] mx-2">
          <FaMoneyBillTrendUp className="w-20 h-20 text-amber-700 mx-[6.5rem] mt-16"/>
          <h2 className="text-3xl font-extrabold font-sans text-amber-700">Pagos</h2>
          <p className="text-amber-700 font-semibold text-xl">Reciente: ${totalIncome} </p>
        </div>
        <div className="p-4 text-center bg-green-400 rounded shadow  
        w-[20rem] h-[20rem]">
          <CgGym className="w-20 h-20 text-green-700 mx-[6.5rem] mt-16"/>
          <h2 className="text-3xl font-extrabold font-sans text-green-700">Actividades</h2>
          <p className="text-green-700 font-semibold text-xl">Total: {totalActivity}</p>
        </div>
        <div className="p-4 text-center bg-violet-400 rounded shadow  w-[20rem] h-[20rem] ">
        <RiPassExpiredFill className="w-20 h-20 text-violet-700 mx-[6.5rem] mt-16"/>
          <h2 className="text-3xl font-extrabold font-sans text-violet-700">Planes por vencer</h2>
          <p className="text-violet-700 font-semibold text-xl">Total: {expiringMembersCount}</p>
        </div>
      </div>

        {/* Gráficos de Pie para Ingresos por Actividad y Miembros por Deporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded shadow flex">
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
