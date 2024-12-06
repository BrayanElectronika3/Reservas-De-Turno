/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Logo from '../../components/Logos/Logo'
import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { schemaReservation } from '../../schemas/reservation.schema'
import { dropdownList, dropdownDate, dropdownObject } from '../../util/dropdown'
import { getUser, setReservationData } from '../../util/localStorage'
import { getServicesHeadquarters, getDaysHoursService } from '../../api/configurationService'
import { postReservation } from '../../api/reservation'

import styles from './ReservationPage.module.css'

const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({ 
        resolver: zodResolver(schemaReservation), 
        shouldFocusError: true, 
        shouldUnregister: true,
    })
    const navigate = useNavigate()

    // Consolidated State
    const [state, setState] = useState({
        userData: {},
        servicesData: {},
        datesData: {},
        options: {
            service: [],
            headquarters: [],
            dates: [],
            times: [],
        },
        modal: false,
        error: {
            active: false,
            title: 'Lo sentimos, algo salió mal',
            message: 'Intente realizar la acción nuevamente en unos minutos.',
            button: false,
        },
    })

    const { userData, servicesData, datesData, options, modal, error } = state

    // Watch Form Values
    const serviceValue = useWatch({ control, name: 'service' })
    const headquartersValue = useWatch({ control, name: 'headquarters' })
    const dateValue = useWatch({ control, name: 'date' })
    const timeValue = useWatch({ control, name: 'time' })

    // Helper Functions
    const fetchInitialData = async () => {
        try {
            const [user, configuration] = await Promise.all([
                getUser(),
                getServicesHeadquarters(),
            ])

            setState(prev => ({
                ...prev,
                userData: user,
                servicesData: configuration.data,
                options: {
                    ...prev.options,
                    service: dropdownObject(configuration.data, 'servicios') || [],
                },
            }))

        } catch (error) {
            console.error('Error getting initial user and service data', error)
            showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
        }
    }

    // Obtener horarios disponibles
    const fetchServiceHours = async () => {
        try {
            const idConfig = servicesData?.servicios?.[serviceValue]?.sedes?.[headquartersValue]?.idConfiguracionReservas
            if (!idConfig) {
                console.log('Error no reservation configuration found for the selected headquarter.')
                showError('Lo sentimos', `No hemos encontrado horarios disponibles para el servicio "${serviceValue}" y la sede "${headquartersValue}".`, true)
                return
            }

            setState(prev => ({ ...prev, modal: true }))
            const { data } = await getDaysHoursService(idConfig)

            setTimeout(() => {
                if (!Object.keys(data?.fechas || {}).length) {
                    setValue('headquarters', '')
                    console.log('Error no dates found for the selected headquarter.')
                    showError('Lo sentimos', `No hemos encontrado horarios disponibles para el servicio "${serviceValue}" y la sede "${headquartersValue}".`, true)
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
            console.error('Error getting days and hours of service data', error)
            showError('Lo sentimos, algo salió mal', `Intente realizar la acción nuevamente en unos minutos. Si el problema persiste, por favor, contacte a nuestro equipo de soporte.`, true)
        }
    }

    // Mostrar Error en pantalla
    const showError = (title, message, button = false) => {
        setState(prev => ({
            ...prev,
            error: { active: true, title, message, button },
            modal: false,
        }))
    }

    // Close Modal
    const closeErrorModal = () => {
        setState(prev => ({ ...prev, error: { ...prev.error, active: false } }))
    }

    // Handle form submission
    const onSubmit = async () => {
        try {
            const reservationData = {
                idPersona: userData.id,
                idServicio: servicesData?.servicios?.[serviceValue]?.idServicio,
                idSede: servicesData?.servicios?.[serviceValue]?.sedes?.[headquartersValue]?.idSede,
                fechaReserva: dateValue,
                horaReserva: timeValue,
                duracionReserva: datesData.duracionReserva,
                servicio: serviceValue,
                sede: headquartersValue,
                estado: 'ACTIVO',
            }
        
            setState(prev => ({ ...prev, modal: true }))
            setReservationData(reservationData)
        
            const response = await postReservation({ data: reservationData })
        
            setTimeout(() => {
                setState(prev => ({ ...prev, modal: false }))
                if (!response) {
                    showError('Lo sentimos', 'Intente realizar la acción nuevamente en unos minutos. Si el problema persiste, por favor, contacte a nuestro equipo de soporte.', true)
                    return

                } else if (response?.error === 1) {
                    showError('Lo sentimos', 'Solo puedes realizar una reserva por día. Para realizar cambios en tu reserva, por favor, selecciona la sección de "Consultar reserva"', true)
                    return
                } else {
                    goNext()
                }
            }, 2000)

        } catch (error) {
            console.error('Error handling form submission:', error)
            showError('Lo sentimos', 'Intente realizar la acción nuevamente en unos minutos. Si el problema persiste, por favor, contacte a nuestro equipo de soporte.', true)
        }
    }

    // Effects Initial Fetch
    useEffect(() => { 
        fetchInitialData() 
    }, [])
    
    // Update headquarters options when service changes
    useEffect(() => {
        setValue('headquarters', '')
        if (!serviceValue) return
        const newOptions = dropdownObject(servicesData?.servicios?.[serviceValue], 'sedes') || []
        setState(prev => ({ ...prev, options: { ...prev.options, headquarters: newOptions } }))
    }, [serviceValue])

    // Fetch service hours when headquarters changes
    useEffect(() => { 
        setValue('date', '')
        if (!headquartersValue) return
        fetchServiceHours()
    }, [headquartersValue])

    // Update available times when date changes
    useEffect(() => {
        setValue('time', '')
        if (!dateValue) return
        const times = dropdownList(datesData?.fechas?.[dateValue]) || []
        setState(prev => ({ ...prev, options: { ...prev.options, times } }))
    }, [dateValue])

    // Navigation functions
    const goNext = useCallback(() => { navigate("/summary", { replace: true }) }, [navigate])
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
                            dropdownOptions={options.service}
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
                                dropdownOptions={options.headquarters} 
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
                                dropdownOptions={options.dates} 
                                defaultValue={''} 
                            />
                        )}
                        {dateValue  && (
                            <CustomDropdown 
                                name='time' 
                                label='Selecciona la hora de la reserva' 
                                control={control} 
                                type='select' 
                                error={errors.time} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={options.times} 
                                defaultValue={''} 
                            />
                        )}
                        {timeValue  && (
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

export default ReservationPage