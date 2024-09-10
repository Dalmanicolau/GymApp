import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPayments } from '../redux/actions/Payments';


function Payments() {
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();
  const paymentsList = useSelector(state => state.payments.payments);

  useEffect(() => {
    // Disparar la acción para obtener los pagos
    dispatch(getPayments());
  }, [dispatch]);

  useEffect(() => {
    setPayments(paymentsList);
  }, [paymentsList]);


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de pagos</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Miembro</th>
            <th className="py-2 px-4 border-b">Plan</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Actividad</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b">{payment.member?.name}</td>
              <td className="py-2 px-4 border-b">${payment.amount}</td>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">
                {payment.activity.map(activity => activity.name).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
