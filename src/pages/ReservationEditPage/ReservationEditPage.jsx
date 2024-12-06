/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Logo from '../../components/Logos/Logo'
import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { schemaReservationEdit } from '../../schemas/reservation.schema'
import { dropdownList, dropdownDate } from '../../util/dropdown'
import { formatDateString } from '../../util/date'
import { getUser, getReservationData, setReservationData } from '../../util/localStorage'
import { getDaysHoursService, getIDConfigReservation } from '../../api/configurationService'
import { patchReservation } from '../../api/reservation'

import styles from './ReservationEditPage.module.css'

const ReservationEditPage = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({ 
        resolver: zodResolver(schemaReservationEdit), 
        shouldFocusError: true, 
        shouldUnregister: true,
    })

    // Consolidated State
    const [state, setState] = useState({
        idConfig: null,
        userData: {},
        datesData: {},
        options: { service: '', headquarters: '', date: '', time: '', dates: [], times: [], },
        modal: false,
        error: { active: false, title: '', message: '', button: false, },
    })

    const { userData, datesData, options, modal, error } = state

    // Watch Form Values
    const dateValue = useWatch({ control, name: 'date' })
    const timeValue = useWatch({ control, name: 'time' })

    // Mostrar Error en pantalla
    const showError = useCallback((title, message, button = false) => {
        setState(prev => ({
            ...prev,
            error: { active: true, title, message, button },
            modal: false,
        }))
    }, [])

    // Helper Functions
    const initialData = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, modal: true }))

            const [user, reservation] = await Promise.all([ getUser(), getReservationData(), ])
 
            setState(prev => ({
                ...prev,
                idConfig: reservation?.id,
                userData: user,
                options: {
                    ...prev.options,
                    service: reservation?.servicio?.nombre,
                    headquarters: reservation?.sede?.nombre,
                    date: formatDateString(reservation?.fechaReserva),
                    time: reservation?.horaReserva,
                },
            }))
            
            setTimeout(async () => {
                const configData = await getIDConfigReservation(reservation?.servicio?.id, reservation?.sede?.id)
                if (!configData?.data) {
                    console.log('No reservation configuration found.')
                    showError(
                        'Lo sentimos', 
                        `No hemos encontrado horarios disponibles para el servicio "${reservation?.servicio?.nombre}" y la sede "${reservation?.sede?.nombre}".`, 
                        true
                    )
                    return
                }

                const { data } = await getDaysHoursService(configData.data.id)
                if (!Object.keys(data?.fechas || {}).length) {
                    console.log('No dates available.')
                    showError(
                        'Lo sentimos', 
                        `No hemos encontrado horarios disponibles para el servicio "${reservation?.servicio?.nombre}" y la sede "${reservation?.sede?.nombre}".`, 
                        true
                    )
                    return
                }

                setState(prev => ({
                    ...prev,
                    modal: false,
                    datesData: data,
                    options: { ...prev.options, dates: dropdownDate(data, 'fechas') },
                }))
            }, 2000)

        } catch (error) {
            console.error('Error getting initial user and service data', error)
            showError(
                'Lo sentimos, algo salió mal', 
                'No se pudo completar la acción. Por favor, intenta nuevamente más tarde.'
            )
        }
    }, [])

    // Close Modal
    const closeErrorModal = () => {
        setState(prev => ({ ...prev, error: { ...prev.error, active: false } }))
    }

    const onSubmit = async () => {
        try {
            const reservationData = {
                fechaReserva: dateValue,
                horaReserva: timeValue,
                servicio: state.options.service,
                sede: state.options.headquarters,
                estado: 'ACTIVO',
            }

            setState(prev => ({ ...prev, modal: true }))
            setReservationData(reservationData)

            const response = await patchReservation(state?.idConfig, { data: reservationData })

            setTimeout(() => {
                setState(prev => ({ ...prev, modal: false }))

                if (!response) {
                    showError(
                        'Lo sentimos, algo salió mal', 
                        'No se pudo completar la acción. Por favor, intenta nuevamente más tarde.', 
                        true
                    )
                    return
                }
                
                goNext()
            }, 2000)

        } catch (error) {
            console.error('Error handling form submission:', error)
            showError(
                'Lo sentimos, algo salió mal', 
                'No se pudo completar la acción. Por favor, intenta nuevamente más tarde.'
            )
        }
    }

    // Effects Initial Fetch
    useEffect(() => { 
        initialData()
    }, [])

    // Update available times when date changes
    useEffect(() => {
        setValue('time', '')
        if (!dateValue) return

        const times = dropdownList(datesData?.fechas?.[dateValue]) || []
        setState(prev => ({ ...prev, options: { ...prev.options, times } }))
    }, [dateValue])

    // Navigation functions
    const goNext = useCallback(() => { navigate("/summary", { replace: true }) }, [navigate])
    const goBack = useCallback(() => { navigate('/review', { replace: true }) }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>Tu reserva</h1>
                        <p>Hola, <strong>{`${userData.nombre}`}</strong></p>
                        <p className={styles.description}>A continuación podrás editar la fecha y hora de la reserva de tu turno.</p>
                        <p>&emsp;<strong>• Servicio:</strong> {state.options.service}</p>
                        <p>&emsp;<strong>• Sede:</strong> {state.options.headquarters}</p>
                        <p>&emsp;<strong>• Fecha:</strong> {state.options.date}</p>
                        <p className={styles.spaceDescription}>&emsp;<strong>• Hora:</strong> {state.options.time}</p>
                        <CustomDropdown 
                            name='date' 
                            label='Selecciona la nueva fecha de la reserva' 
                            control={control} 
                            type='select' 
                            error={errors.date} 
                            placeholder='Selecciona una opción' 
                            dropdownOptions={options.dates} 
                            defaultValue={''} 
                        />
                        {dateValue  && (
                            <CustomDropdown 
                                name='time' 
                                label='Selecciona la nueva hora de la reserva' 
                                control={control} 
                                type='select' 
                                error={errors.time} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={options.times} 
                                defaultValue={''} 
                            />
                        )}
                        <div className={styles.containerButtons}>
                            <CustomButton 
                                name='submit' 
                                label='Continuar' 
                                type='submit' 
                            />
                            <CustomButton 
                                name='buttonGoBack' 
                                label='Regresar' 
                                type='button' 
                                onClick={goBack}
                            />
                        </div>
                    </form>
                    { modal && (
                        <CustomModal 
                            title='Verificando información'
                            description='Estamos validando los datos ingresados. Este proceso puede tardar unos segundos.'
                        />
                    )}
                    { error.active && (
                        <CustomModal 
                            title={error.title}
                            description={error.message}
                            error={true}
                            showButton={error.button}
                            onButtonClick={closeErrorModal}
                        />
                    )} 
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default ReservationEditPage