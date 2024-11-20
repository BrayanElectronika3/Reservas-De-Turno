'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomDateTime from '../../components/DateTime/CustomDateTime'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'
import CustomButton from '../../components/Button/CustomButton'
import Logo from '../../components/Logos/Logo'
import LogoFooter from '../../components/Logos/LogoFooter'

import { schemaReservation } from '../../schemas/reservation.schema'
import { getUser, setReservationData } from '../../util/localStorage'
import { getConfigurationService } from '../../api/configurationService'

import styles from './ReservationPage.module.css'

// Transformar el objeto en un arreglo para los dropdown
const optionsDropdown = (data, value) => {
    // const optionsService = [ { value: 'Value 1', label: 'Label 1' }, { value: 'Value 2', label: 'Label 2' } ]
    if (!data[value]) return []
    return Object.keys(data[value]).map(key => ({
        value: key,
        label: key
    }))
}

const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ 
        resolver: zodResolver(schemaReservation), 
        shouldFocusError: true, 
        shouldUnregister: true
    })

    const [jsonData, setJsonData]  = useState({})
    const [data, setData] = useState({})
    const [optionsService, setOptionsService] = useState([])
    const [optionsCategory, setOptionsCategory] = useState([])
    const [optionsSubCategory, setOptionsSubCategory] = useState([])
    const [optionsHeadquarter, setOptionsHeadquarter] = useState([])

    const navigate = useNavigate()

    // Observables to watch form changes
    const serviceValue = useWatch({ control, name: 'service' })
    const categoryValue = useWatch({ control, name: 'category'})
    const subCategoryValue = useWatch({ control, name: 'subCategory'})
    const headquartersValue = useWatch({ control, name: 'headquarters'})
    const dateTime = useWatch({ control, name: 'dateTime'})

    // Effect hooks for updating dropdown options based on selection changes
    useEffect(() => { 
        if (serviceValue) { 
            const servicios = data.servicios?.[serviceValue]
            setOptionsCategory(optionsDropdown(servicios, 'categorias') || [])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceValue])

    useEffect(() => { 
        if (categoryValue) { 
            const categorias = data.servicios?.[serviceValue]?.categorias?.[categoryValue]
            setOptionsSubCategory(optionsDropdown(categorias, 'subCategorias') || [])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryValue])

    useEffect(() => { 
        if (subCategoryValue) {
            const subCategorias = data.servicios?.[serviceValue]?.categorias?.[categoryValue]?.subCategorias?.[subCategoryValue]
            setOptionsHeadquarter(optionsDropdown(subCategorias, 'headquarters') || [])
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subCategoryValue])

    useEffect(() => { 
        if (headquartersValue) { 
            console.log("Sede seleccionada:", headquartersValue) 
        } 
    }, [headquartersValue])

    useEffect(() => { 
        if (dateTime) { 
            console.log("Fecha seleccionada:", dateTime) 
        } 
    }, [dateTime])

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Consultando Datos...')
                const [userData, configuration] = await Promise.all([getUser(), getConfigurationService()])
                setJsonData(userData)
                setData(configuration.data)
                setOptionsService(optionsDropdown(configuration.data, 'servicios') || [])

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    // Handle form submission
    const onSubmit = (data) => { 
        console.log(data)
        setReservationData(data)
        goNext()
    }

    // Navigation functions
    const goNext = () => { navigate("/summary", { replace: true }) }
    const goBack = () => { navigate("/login", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>Tu reserva</h1>
                        <div></div>
                        <p>Hola, <strong>{`${jsonData.nombre}`}</strong>. <br></br> A continuación podrás programar la reserva de tu turno.</p>
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
                                name='category' 
                                label='Cuál es la categoria del servicio?' 
                                control={control} 
                                type='select' 
                                error={errors.category} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={optionsCategory} 
                                defaultValue={''} 
                            />
                        )}
                        {categoryValue && (
                            <CustomDropdown 
                                name='subCategory' 
                                label='¿Cuál es la subcategoria del servicio?' 
                                control={control} 
                                type='select' 
                                error={errors.subCategory} 
                                placeholder='Selecciona una opción' 
                                dropdownOptions={optionsSubCategory} 
                                defaultValue={''} 
                            /> )}
                        {subCategoryValue && (
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
                            <CustomDateTime 
                                name='dateTime' 
                                label='¿Cuál es la fecha y hora que deseas reservar?' 
                                control={control} 
                                type='datetime-local' 
                                error={errors.dateTime} 
                            />
                        )}
                        {dateTime && (
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