'use client'

import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'
import viTurnoLogo from '../../assets/favicon.png'

import { setTenantData, setDocumentType } from '../../util/localStorage'
import { documentTypeFetch } from '../../api/documentType'

import styles from './HomePage.module.css'

const HomePage = () => {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const { IDTenant } = useParams()

    setTenantData(IDTenant)

    const handleViewReservation = async () => {
        console.log('Redireccionando a consulta de reservas')
    }

    const handleNewReservation  = async () => {
        setModal(true)

        const response = await documentTypeFetch()
        if (!response && !response?.data) {
            console.log('Error en la solicitud API de identificaciones')
            return
        }

        const result = response.data.filter(item => item.estado === "ACTIVO").map(item => ({ cod: item.codigo, value: item.nombre }))
        setDocumentType(result)

        setTimeout(() => { navigate("/login", { replace: true }); }, 5000)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <img src={viTurnoLogo} alt="Viturno logo" className={styles.logo} />
                        <h1 className={styles.title}>RESERVA DE TURNO</h1>
                    </div>
                    <div className={styles.informativeMessage}>
                        <InformativeMessage/>
                    </div>
                    <div className={styles.buttonContainer}>
                        <CustomButton name="activateTurn" label="Ver reserva" type="button" onClick={handleViewReservation}/>
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