import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPayments } from "../redux/actions/Payments";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const dispatch = useDispatch();
  const paymentsList = useSelector((state) => state.payments.payments);

  useEffect(() => {
    // Disparar la acción para obtener los pagos
    dispatch(getPayments());
  }, [dispatch]);

  useEffect(() => {
    setPayments(paymentsList);
    setFilteredPayments(paymentsList); // Inicialmente, todos los pagos están visibles
  }, [paymentsList]);

  useEffect(() => {
    // Filtrar los pagos según el término de búsqueda
    setFilteredPayments(
      payments.filter(
        (payment) =>
          payment.member?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.activity.some((activity) =>
            activity.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    );
  }, [searchTerm, payments]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de pagos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por miembro"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded p-2 w-full max-w-xs ml-20"
        />
      </div>
      <table className="min-w-full bg-gray-100 rounded shadow">
        <thead>
          <tr className="">
            <th className="py-2 px-2 border-b">Miembro</th>
            <th className="py-2 px-2 border-b">Plan</th>
            <th className="py-2 px-2 border-b">Fecha</th>
            <th className="py-2 px-2 border-b">Actividad</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <tr key={payment._id}>
                <td className="text-center py-2 px-4 border-b">{payment.member?.name}</td>
                <td className="text-center py-2 px-4 border-b">${payment.amount}</td>
                <td className="text-center py-2 px-4 border-b">
                  {new Date(payment.date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="text-center py-2 px-4 border-b">
                  {payment.activity.map((activity) => activity.name).join(", ")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
