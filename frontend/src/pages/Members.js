import React, { useEffect, useState } from "react";
import api from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Simulación de obtener datos de la API
    api
      .get("/members")
      .then((response) => setMembers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label></label>
        </th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Fecha de Ingreso</th>
        <th>Actividad</th>
      </tr>
    </thead>
    <tbody>
      {members.map((member) => (
        <tr key={member._id}>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={member.avatar || "https://via.placeholder.com/150"} // Ajusta según tu estructura de datos
                    alt={member.name}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{member.name}</div>
              </div>
            </div>
          </td>
          <td>
            {member.email}
            <br />
          </td>
          <td>{new Date(member.plan.initDate).toLocaleDateString()}</td>
          <td>
            {member.activities.map(activity => activity.name).join(', ')}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default Members;

/*<table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Fecha de ingreso</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td className="py-2 px-4 border-b">{member.name}</td>
              <td className="py-2 px-4 border-b">{member.email}</td>
              <td className="py-2 px-4 border-b">{member.plan.initDate}</td>
            </tr>
          ))}
        </tbody>
      </table>*/
