'use client'

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../components/Logos/Logo'
import CustomCard from '../../components/Card/CustomCard'
import CustomButton from '../../components/Button/CustomButton'

import { getReservationsByPerson } from '../../util/localStorage'
import { formatDateString } from '../../util/date'

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
        console.log('Editando tarjeta con ID:', selectedCard)
    }

    const goBack = useCallback(() => { navigate('/consultReservation', { replace: true }) }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <Logo/>
                    <h1 className={styles.title}>Reservas</h1>
                    <div className={styles.cards}>
                        {reservationsData.map((item) => (
                            <CustomCard 
                                key={item.id}
                                title={<><strong>Servicio:</strong> {item.servicio.nombre.toString()}</>} 
                                message={<><strong>Sede:</strong> {item.sede.nombre.toString()}</>} 
                                footer={<>
                                    <div><strong>Fecha:</strong> {formatDateString(item.fechaReserva)}</div>
                                    <div><strong>Hora:</strong> {item.horaReserva}</div>
                                </>} 
                                onCardClick={() => handleClickCard(item.id)}
                                backgroundColor={selectedCard === item.id ? 'rgba(55, 39, 122, 0.25)' : '#fff'}
                                color={selectedCard === item.id ? '#000' : '#000'}
                            />
                        ))}
                    </div>
                    <div className={styles.containerButtons}>
                        <CustomButton 
                            name='buttonGoNext' 
                            label='Editar' 
                            type='button' 
                            onClick={handleEdit} 
                            disabled={selectedCard === null}
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