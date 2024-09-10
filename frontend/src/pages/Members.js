import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../redux/actions/Member';
import NewMemberModal from '../components/NewMemberModal';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div>
      <h2 className="font-bold text-2xl">Miembros</h2>
      <button className="btn btn-primary" onClick={handleModalOpen}>Agregar Miembro</button>

      <div className="overflow-x-auto mt-4">
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
                <td>{member.activities.map(activity => activity.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <NewMemberModal closeModal={handleModalClose} />}
    </div>
  );
}

export default Members;
