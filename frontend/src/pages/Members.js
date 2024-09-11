import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../redux/actions/Member";
import NewMemberModal from "../components/NewMemberModal";
import PaymentModal from "../components/PaymentModal";
import { renewMemberPlan } from "../redux/actions/Member";
import { FaUser } from "react-icons/fa";

function Members() {
  const dispatch = useDispatch();
  const { members, total } = useSelector((state) => state.members.members);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [renewedMember, setRenewedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchMembers(currentPage, itemsPerPage));
  }, [dispatch, currentPage]);

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
        console.error(
          "Error al renovar plan:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const filteredMembers = members?.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="ml-6 font-bold text-3xl">Miembros</h2>
      <div className="p-4 bg-gray-100 rounded shadow">
      <div className="mt-4 translate-x-[20rem]">
        <input
          type="text"
          placeholder="Buscar miembros..."
          className="input rounded-md border-0 w-full max-w-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary bg-blue-500 translate-x-[80rem]"
        onClick={handleModalOpen}
      >
        Agregar Miembro
      </button>
      <button
        className={`btn btn-secondary translate-x-[60rem] ${
          selectedMembers.length === 0 ? "btn-disabled" : ""
        }`}
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
          {filteredMembers?.map((member) => (
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
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} />
                        ) : (
                          <FaUser className="text-gray-600 text-4xl" />
                        )}
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
                  {member.activities
                    .map((activity) => activity.name)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-evenly	 mt-6 ">
        <button
          className="btn btn-primary  bg-blue-500"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="text-xl">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-primary bg-blue-500"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {isModalOpen && <NewMemberModal closeModal={handleModalClose} />}
      {isPaymentModalOpen && renewedMember && (
        <PaymentModal
          member={renewedMember} // Pasar el miembro renovado al modal de pago
          closePaymentModal={() => setIsPaymentModalOpen(false)}
        />
      )}
      </div>
    </div>
  );
}

export default Members;
