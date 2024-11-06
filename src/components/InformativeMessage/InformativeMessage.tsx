import React from "react";
import './InformativeMessage.css'

export const InformativeMessage = () => {
    return (
        <div className="modal-content">
            <h2 className="title-card">Aquí podrás:</h2>
            <p className="item">📆 Reservar el turno para gestionar tu tiempo y tener prioridad en la fila para la atención.</p>
            <p className="item">✍️ Modificar o eliminar tu reserva.</p>
            <p className="item">💎 Ver el número del turno reservado.</p>
            <p className="item">✅ Activar el turno.</p>
            <p className="item">⏰ Verificar cuántas personas serán atendidas antes de ti y congelar el turno.</p>
        </div>
    )
}

export default InformativeMessage;