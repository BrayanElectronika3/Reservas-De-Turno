'use client'

import { useState } from 'react'
import { redirect } from "react-router-dom";

import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'

import './HomePage.css'

const HomePage = () => {
    const [modal, setModal] = useState(false);
    
    const newReservation = async () => {
        setModal(true);
        setTimeout(() => {
            console.log("Waiting 2 seconds..");
            return redirect("/login");
        }, 2000);
    };
    
    const closeModal = () => {
        setModal(false);
    };

    return (
        <>
            {/* Title */}
            <h1 className='title'>Reserva de turnos VITURNO</h1>

            {/* Card - Informative Message */}
            <div className="card">
                <InformativeMessage/>
                
                <div className='custom-div'>
                    <CustomButton name={'activateTurn'} label={'Ver reserva o activar turno'} type='button'/>
                </div>
                
                <div className='custom-div'>
                    <CustomButton name={'newReservation'} label={'Nueva Reserva'} type='button' onClick={newReservation}/>
                </div>
            </div>
            
            {/* Modal */}
            { modal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>La reserva no es una cita</h2>
                        <p>Te recomendamos activar tu turno 5 minutos antes y durante los 20 minutos de la hora de tu reserva.</p>
                        <button onClick={closeModal}>&times;</button>
                    </div>
                </div>
            )}
        </>        
    )
}

export default HomePage