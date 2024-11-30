/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'
import CustomButton from '../../components/Button/CustomButton'
import Logo from '../../components/Logos/Logo'
import LogoFooter from '../../components/Logos/LogoFooter'

import { schemaReservation } from '../../schemas/reservation.schema'
import { getServicesHeadquarters, getServiceHours } from '../../api/configurationService'
import { reservationFetch } from '../../api/reservation'
import { getUser, setReservationData } from '../../util/localStorage'
import { dropdownList, dropdownDate, dropdownObject } from '../../util/dropdown'

import styles from './ReservationPage.module.css'

// Componente de reservacion
const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({ 
        resolver: zodResolver(schemaReservation), 
        shouldFocusError: true, 
        shouldUnregister: true,
    })

    const navigate = useNavigate()

    // State
    const [userData, setUserData] = useState({})
    const [servicesData, setServicesData] = useState({})
    const [datesData, setDatesData] = useState({})
    const [optionsService, setOptionsService] = useState([])
    const [optionsHeadquarter, setOptionsHeadquarter] = useState([])
    const [optionsDates, setOptionsDates] = useState([])
    const [availableTimes, setAvailableTimes] = useState([])

    // Watch form values
    const serviceValue = useWatch({ control, name: 'service' })
    const headquartersValue = useWatch({ control, name: 'headquarters' })
    const date = useWatch({ control, name: 'date' })
    const time = useWatch({ control, name: 'time' })

     // Fetch user and services data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [user, configuration] = await Promise.all([
                    getUser(),
                    getServicesHeadquarters(),
                ])
                setUserData(user)
                setServicesData(configuration.data)
                setOptionsService(dropdownObject(configuration.data, 'servicios') || [])

            } catch (error) {
                console.error('Error fetching initial data:', error)
            }
        }

        fetchInitialData()
    }, [])

    // Update headquarters options when service changes
    useEffect(() => {
        setValue('headquarters', '')
        if (serviceValue) {
            const newOptions = dropdownObject(servicesData?.servicios?.[serviceValue], 'sedes') || []
            setOptionsHeadquarter(newOptions)
        }
    }, [serviceValue])

    // Fetch service hours when headquarters changes
    useEffect(() => {
        if (!headquartersValue) return

        const fetchServiceHours = async () => {
            try {
                const idConfigReservation = servicesData?.servicios?.[serviceValue]?.sedes?.[headquartersValue]?.idConfiguracionReservas

                if (idConfigReservation) {
                    const { data } = await getServiceHours(idConfigReservation)
                    setDatesData(data)
                    setOptionsDates(dropdownDate(data, 'fechas'))
                } else {
                    console.warn('No reservation configuration found for the selected headquarter.')
                }
            } catch (error) {
                console.error('Error fetching service hours:', error)
            }
        }

        fetchServiceHours()
    }, [headquartersValue])

    // Update available times when date changes
    useEffect(() => {
        if (date) {
            setAvailableTimes(dropdownList(datesData?.fechas?.[date]) || [])
        }
    }, [date])

    // Handle form submission
    const onSubmit = async () => {
        try {
            const data = {
                idPersona: userData.id,
                idServicio: servicesData?.servicios?.[serviceValue]?.idServicio,
                idSede: servicesData?.servicios?.[serviceValue]?.sedes?.[headquartersValue]?.idSede,
                fechaReserva: date,
                horaReserva: time,
                duracionReserva: datesData.duracionReserva,
            }
            
            setReservationData(data)
            const response = await reservationFetch({ data })
            console.log(response)
            
            // goNext()
            
        } catch (error) {
            console.error('Error handling form submission:', error)
        }
    }

    // Navigation functions
    // const goNext = useCallback(() => { navigate("/summary", { replace: true }) }, [navigate])
    const goBack = useCallback(() => { navigate('/login', { replace: true }) }, [navigate])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>Tu reserva</h1>
                        <p>
                            Hola, <strong>{`${userData.nombre}`}</strong>. <br/>
                            A continuación podrás programar la reserva de tu turno.
                        </p>
                        <CustomDropdown 
                            name='service' 
                            label='¿Qué servicio necesitas?' 
                            control={control} 
                            type='select' 
                            error={errors.service} 
                            placeholder='Selecciona una opción' 
                            dropdownOptions={optionsService}
                            defaultValue={''}
                        />
                        {serviceValue && (
                            <CustomDropdown 
                                name='headquarters' 
                                label='¿A cuál de las sedes vas a asistir?' 
                                control={control} 
                                type='select' 
                                error={errors.headquarters} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={optionsHeadquarter} 
                                defaultValue={''} 
                            />
                        )}
                        {headquartersValue && (
                            <CustomDropdown 
                                name='date' 
                                label='Selecciona la fecha de la reserva' 
                                control={control} 
                                type='select' 
                                error={errors.date} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={optionsDates} 
                                defaultValue={''} 
                            />
                        )}
                        { date && (
                            <CustomDropdown 
                                name='time' 
                                label='Selecciona la hora de la reserva' 
                                control={control} 
                                type='select' 
                                error={errors.time} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={availableTimes} 
                                defaultValue={''} 
                            />
                        )}
                        {time && (
                            <div className={styles.containerCheck}>
                                <CustomCheckButton 
                                    name="termsAndConditions" 
                                    label='Acepta terminos y condiciones' 
                                    control={control} 
                                    disabled={false} 
                                    isChecked={false} 
                                    error={errors.termsAndConditions} 
                                    link={true} href='https://viturno.com/politica-privacidad/'
                                />
                            </div>
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
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default ReservationPage