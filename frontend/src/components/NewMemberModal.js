import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../redux/actions/Member";
import { fetchActivities } from "../redux/actions/Activity"; // Asumiendo que tienes esta acción
import PaymentModal from "./PaymentModal"; // Importar el modal de pago

function NewMemberModal({ closeModal }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.activities);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // Controlar apertura del modal de pago
  const [newMember, setNewMember] = useState(null); // Guardar el miembro recién registrado

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellphone: "",
    plan: {
      type: "Mensual", // Valor por defecto
      initDate: "",
    },
    activities: [],
    automaticRenewal: true, // Valor por defecto si es necesario
    promotion: false,
  });

  useEffect(() => {
    dispatch(fetchActivities()); // Cargar actividades disponibles al montar el componente
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlanChange = (e) => {
    setFormData({
      ...formData,
      plan: {
        ...formData.plan,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleActivityChange = (e) => {
    const selectedActivities = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, activities: selectedActivities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registeredMember = await dispatch(addMember(formData)); // Registrar el miembro
      console.log("Miembro registrado:", registeredMember); // Verifica que registeredMember tenga el valor correcto

      if (registeredMember) {
        setNewMember(registeredMember); // Guardar el miembro registrado en el estado
        await new Promise((resolve) =>{
          setNewMember(registeredMember);
          resolve();
        } )
        console.log("Guardando nuevo miembro en el estado:", registeredMember); // Verifica que newMember se esté guardando correctamente
        closeModal(); // Cerrar el modal de nuevo miembro
        setIsPaymentModalOpen(true); // Abrir el modal de pago
      }
    } catch (error) {
      console.error("Error al registrar el miembro", error);
    }
  };

  // Este useEffect se ejecuta cuando newMember cambia
  useEffect(() => {
    console.log("ejecutando useEffect...", newMember);
    if (newMember) {
      console.log("Nuevo miembro guardado:", newMember);
      setIsPaymentModalOpen(true);
      console.log("Abriendo modal de pago...", isPaymentModalOpen);
    }
  }, [newMember]);

  return (
    <>
      {/* Modal para registrar nuevo miembro */}
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Registrar Nuevo Miembro</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Teléfono</label>
              <input
                type="text"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleInputChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Fecha de Inicio del Plan</label>
              <input
                type="date"
                name="initDate"
                value={formData.plan.initDate}
                onChange={handlePlanChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Tipo de Plan</label>
              <select
                name="type"
                value={formData.plan.type}
                onChange={handlePlanChange}
                className="select select-bordered"
              >
                <option value="monthly">Mensual</option>
                <option value="semiannual">Semestral</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">Actividades</label>
              <select
                name="activities"
                multiple
                value={formData.activities}
                onChange={handleActivityChange}
                className="select select-bordered"
              >
                {activities.map((activity) => (
                  <option key={activity._id} value={activity._id}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal para confirmar el pago */}
      {isPaymentModalOpen && newMember && (
        <PaymentModal
          member={newMember} // Pasar el miembro registrado al modal de pago
          closePaymentModal={() => setIsPaymentModalOpen(false)} // Cerrar el modal de pago
        />
      )}
    </>
  );
}

export default NewMemberModal;
