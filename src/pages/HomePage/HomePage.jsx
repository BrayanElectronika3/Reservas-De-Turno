'use client'

import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'

import { documentTypeFetch } from '../../api/documentType'

import styles from './HomePage.module.css'

const HomePage = () => {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const { IDTenant } = useParams()
    
    localStorage.setItem("tenant", IDTenant)

    const handleNewReservation  = async () => {
        setModal(true)

        const response = await documentTypeFetch()
        if (!response && !response?.data) {
            console.log('Error en solicitud API de identificaciones')
            return
        }

        const result = response.data.filter(item => item.estado === "ACTIVO").map(item => ({ cod: item.codigo, value: item.nombre }))
        localStorage.setItem('documentType', JSON.stringify(result))

        setTimeout(() => { navigate("/login", { replace: true }); }, 5000)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <div className={styles.card}>
                    <h1 className={styles.title}>RESERVAS DE TURNOS</h1>
                    <InformativeMessage/>
                    <div className={styles.buttonContainer}>
                        <CustomButton name="activateTurn" label="Ver reserva" type="button" />
                        <CustomButton name="newReservation" label="Nueva Reserva" type="button" onClick={handleNewReservation} />
                    </div>
                </div>
                { modal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>La reserva no es una cita</h2>
                            <p>Te recomendamos activar tu turno 5 minutos antes y durante los primeros 10 minutos de la hora de tu reserva.</p>
                        </div>
                    </div>
                )}     
            </div>
        </div>
    )
}

export default HomePage