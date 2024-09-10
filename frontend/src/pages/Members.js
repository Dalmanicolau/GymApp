import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../redux/actions/Member';
import NewMemberModal from '../components/NewMemberModal';
import PaymentModal from '../components/PaymentModal';
import { renewMemberPlan } from '../redux/actions/Member';

function Members() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewedMember, setRenewedMember] = useState(null);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleRenewPlan = async () => {
    for (const memberId of selectedMembers) {
      try {
        const renewedMemberData = await dispatch(renewMemberPlan(memberId));
        setRenewedMember(renewedMemberData);
        setIsPaymentModalOpen(true);
        break;
      } catch (error) {
        console.error('Error al renovar plan:', error.response ? error.response.data : error.message);
      }
    }
  };
  

  return (
    <div>
      <h2 className="font-bold text-2xl">Miembros</h2>
      <button className="btn btn-primary bg-slate-400 translate-x-[80rem]" onClick={handleModalOpen}>Agregar Miembro</button>
      <button
        className={`btn btn-secondary translate-x-[60rem] ${selectedMembers.length === 0 ? 'btn-disabled' : ''}`}
        onClick={handleRenewPlan}
        disabled={selectedMembers.length === 0}
      >
        Renovar plan
      </button>
      <div className="overflow-x-auto mt-4">
        <table className="table">
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
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedMembers.includes(member._id)}
                      onChange={() => handleCheckboxChange(member._id)}
                    />
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
      {isPaymentModalOpen && renewedMember && (
        <PaymentModal
          member={renewedMember} // Pasar el miembro renovado al modal de pago
          closePaymentModal={() => setIsPaymentModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Members;
