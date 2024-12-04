'use client'

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'

import Logo from '../../components/Logos/Logo'
import CustomCard from '../../components/Card/CustomCard'
import CustomButton from '../../components/Button/CustomButton'

import { formatDateString } from '../../util/date'
import { getReservationsByPerson, getWorkSpaceTenant, setReservationData } from '../../util/localStorage'

import styles from './ReviewPage.module.css'

const ReviewPage = () => {
    const navigate = useNavigate()
    const [selectedCard, setSelectedCard] = useState(null)

    const reservationsData = getReservationsByPerson()

    const handleClickCard = (id) => {
        setSelectedCard((prevSelected) => (prevSelected === id ? null : id))
    }

    const handleEdit = () => {
        if (!selectedCard) return
        reservationsData.map((item) => {
            if (item.id === selectedCard) {
                setReservationData(item)
            }
        })
        goEdit()
    }

    const goNext = useCallback(() => { navigate(`/${getWorkSpaceTenant()}`, { replace: true }) }, [navigate])
    const goEdit = useCallback(() => { navigate(`/reservationEdit`, { replace: true }) }, [navigate])
    const goBack = useCallback(() => { navigate('/consultReservation', { replace: true }) }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <Logo/>
                    <h1 className={styles.title}>Reservas</h1>
                    <p className={styles.description}>
                        Para modificar la fecha y hora de la reserva, por favor seleccione la que desee y haga clic en el boton &quot;{<Pencil size={12}/>}&quot;
                    </p>
                    <div className={styles.cards}>
                        {reservationsData.map((item) => (
                            <CustomCard 
                                key={item.id}
                                title={<><strong>Servicio:</strong> {item.servicio.nombre.toString()}</>} 
                                message={<>
                                    <strong>Sede:</strong> {item.sede.nombre.toString()}
                                    <div><strong>Fecha:</strong> {formatDateString(item.fechaReserva)}</div>
                                    <div><strong>Hora:</strong> {item.horaReserva}</div>
                                </>}
                                backgroundColor={selectedCard === item.id ? 'rgba(55, 39, 122, 0.1)' : '#fff'}
                                buttonHidden={!(selectedCard === item.id)}
                                onCardClick={() => handleClickCard(item.id)}
                                onButtonClick={() => handleEdit()}
                                buttonLabel={<Pencil size={16}/>}
                            />
                        ))}
                    </div>
                    <div className={styles.containerButtons}>
                        <CustomButton 
                            name='buttonGoNext' 
                            label='Finalizar' 
                            type='button' 
                            onClick={goNext} 
                        />
                        <CustomButton 
                            name='buttonGoBack' 
                            label='Regresar' 
                            type='button' 
                            onClick={goBack}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage