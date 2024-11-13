'use client'

import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"

import InformativeMessage from '../../components/InformativeMessage/InformativeMessage'
import CustomButton from '../../components/Button/CustomButton'
import Logo from '../../components/Logos/Logo'
import LogoFooter from '../../components/Logos/LogoFooter'

import viTurnoIcon from '../../assets/favicon.png'

import { setTenantData, setDocumentType } from '../../util/localStorage'
import { documentTypeFetch } from '../../api/documentType'
import { tenantFetch } from '../../api/tenant'

import styles from './HomePage.module.css'

const HomePage = () => {
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const { tenant } = useParams()

    setTenantData(tenant)

    const handleViewReservation = async () => {
        const responseTenant = await tenantFetch(tenant)
        if (!responseTenant && !responseTenant?.data) {
            console.log('Error en la solicitud API de consulta de tenant')
            return
        }

        setTenantData(JSON.stringify(responseTenant.data))

        navigate("/consultReservation", { replace: true })
    }

    const handleNewReservation  = async () => {
        setModal(true)

        const responseTenant = await tenantFetch(tenant)
        if (!responseTenant && !responseTenant?.data) {
            console.log('Error en la solicitud API de consulta de tenant')
            return
        }

        if(responseTenant.data.estado !== "ACTIVO") {
            console.log('Error en la solicitud API de consulta de tenant, el tenant no se encuentra activo')
            return
        }

        setTenantData(JSON.stringify(responseTenant.data))
        
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
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <div>
                        <Logo/>
                        <h1 className={styles.title}>Reserva de Turno</h1>
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
                                <div className={styles.header}>
                                    <img src={viTurnoIcon} alt="Viturno logo2" className={styles.logo2} />
                                    <h1 className={styles.title2}>La reserva no es una cita</h1>
                                </div>
                                <p>Te recomendamos activar tu turno 5 minutos antes y durante los primeros 10 minutos de la hora de tu reserva.</p>
                            </div>
                        </div>
                    )}     
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default HomePage