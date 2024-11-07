'use client'

import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'

import styles from './HomePage.module.css';

const HomePage = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const handleNewReservation  = async () => {
        setModal(true);
        setTimeout(() => { navigate("/login", { replace: true }); }, 5000);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                {/* Card */}
                <div className={styles.card}>
                    {/* Title */}
                    <h1 className={styles.title}>Reserva de turnos VITURNO</h1>
                    {/* Informative Message */}
                    <InformativeMessage/>
                    {/* Buttons */}
                    <div className={styles.buttonContainer}>
                        {/* Active Turn */}
                        <CustomButton name="activateTurn" label="Ver reserva o activar turno" type="button" />
                        {/* New Reservation */}
                        <CustomButton name="newReservation" label="Nueva Reserva" type="button" onClick={handleNewReservation} />
                    </div>
                </div>
                {/* Modal */}
                { modal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>La reserva no es una cita</h2>
                            <p>Te recomendamos activar tu turno 5 minutos antes y durante los 20 minutos de la hora de tu reserva.</p>
                        </div>
                    </div>
                )}     
            </div>
        </div>
    )
}

export default HomePage