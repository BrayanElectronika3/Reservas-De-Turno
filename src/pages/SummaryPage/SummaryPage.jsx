'use client'

import { useState, useEffect } from 'react'
import { UserRoundCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logos/Logo'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { getReservationData, getWorkSpaceTenant } from '../../util/localStorage'
import { formatDateString } from '../../util/date'

import styles from './SummaryPage.module.css'

const SummaryPage = () => {
    const navigate = useNavigate()
    const [reservation, setReservation] = useState(null)
    const [error, setError] = useState({
        active: false,
        title: '',
        message: '',
        button: false,
    })

    // Fetch and validate reservation data
    useEffect(() => {
        const data = getReservationData()

        if (!data || Object.keys(data).length === 0) {
            console.log('Error obtaining reservation data')
            showError('Lo sentimos', 'Intente realizar la acción nuevamente en unos minutos. Si el problema persiste, por favor, contacte a nuestro equipo de soporte.', true)
            return
        }

        setReservation(data)
    }, [])

    // Error handler
    const showError = (title, message, button = false) => {
        setError({ active: true, title, message, button })
    }

    const closeErrorModal = () => {
        setError(prev => ({ ...prev, active: false }))
    }

    // Handle finalization
    const handleFinish = () => {
        localStorage.clear()
        navigate(`/${getWorkSpaceTenant()}`, { replace: true })
    }

    const { servicio: service, sede: headquarters, fechaReserva: date, horaReserva: time } = reservation || {}

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <Logo/>
                    <div className={styles.check}>
                        <UserRoundCheck size={60} color='#381283'/>
                    </div>
                    <h1 className={styles.title}>Resumen de la reserva</h1>
                    <div className={styles.summary}>
                        {service ? (
                            <>
                                <p><strong>• Servicio:</strong> {service}</p>
                                <p><strong>• Sede:</strong> {headquarters}</p>
                                <p><strong>• Fecha de la reserva:</strong> {formatDateString(date)}</p>
                                <p><strong>• Hora de la reserva:</strong> {time}</p>
                            </>
                        ) : (
                            <>
                                <p>No hay datos de reserva disponibles.</p>
                            </>
                        )}
                    </div>
                    <CustomButton 
                        name="buttonFinish" 
                        label="Finalizar" 
                        type="button" 
                        onClick={handleFinish} 
                    />
                </div>
                { error.active && (
                    <CustomModal 
                        title={error.title}
                        description={error.message}
                        error={true}
                        showButton={error.button}
                        onButtonClick={closeErrorModal}
                    />
                )}
                <LogoFooter/>
            </div>
        </div>
    )
}

export default SummaryPage