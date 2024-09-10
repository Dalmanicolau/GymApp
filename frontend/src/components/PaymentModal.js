import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment } from '../redux/actions/Payments';

function PaymentModal({ member, closePaymentModal }) {
  const dispatch = useDispatch();
  
  // Obtener actividades del store
  const activities = useSelector((state) => state.activities.activities);

  const handlePayment = () => {
    const paymentData = {
      member: member._id,
      amount: member.plan.price, // Precio total
      activities: member.activities, // IDs de actividades
    };

    // Despachar la acción para registrar el pago
    dispatch(addPayment(paymentData));
    closePaymentModal(); // Cerrar modal después de confirmar el pago
  };

  // Buscar los nombres de las actividades
  const memberActivities = member?.activities?.map(activityId => {
    const activity = activities.find(act => act._id === activityId);
    return activity ? activity.name : 'Actividad desconocida';
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirmar Pago</h3>
        <p><strong>Nombre:</strong> {member?.name}</p>
        <p><strong>Actividades:</strong> {memberActivities?.join(', ')}</p>
        <p><strong>Total a Pagar:</strong> ${member?.plan?.price || 'Precio no disponible'}</p>

        <div className="modal-action">
          <button className="btn" onClick={closePaymentModal}>Cancelar</button>
          <button className="btn btn-primary" onClick={handlePayment}>Confirmar Pago</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
