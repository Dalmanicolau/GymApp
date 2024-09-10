// src/components/MembersTable.js
import React from 'react';

function MembersTable({ members }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de Ingreso</th>
            <th>Actividad</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member) => (
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
                        src={member.avatar || "https://via.placeholder.com/150"}
                        alt={member.name}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{member.name}</div>
                  </div>
                </div>
              </td>
              <td>{member.email}</td>
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

export default MembersTable;
