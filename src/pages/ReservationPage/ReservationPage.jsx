'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomDateTime from '../../components/DateTime/CustomDateTime'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaReservation } from '../../schemas/reservation.schema'

import styles from './ReservationPage.module.css'

const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({ resolver: zodResolver(schemaReservation), shouldFocusError: true, shouldUnregister: true})
    const [jsonData, setJsonData] = useState({})
    const navigate = useNavigate()

    const serviceValue = watch('service')
    const categoryValue = watch('category')
    const subCategoryValue = watch('subCategory')
    const headquartersValue = watch('headquarters')
    const dateTime = watch('dateTime')

    useEffect(() => {
        const user = localStorage.getItem('user')
        setJsonData(JSON.parse(user))
    }, [])

    const onSubmit = (data) => { console.log(data) }

    const goBack = () => { navigate("/login", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.title}>Tu reserva</h1>
                    <p>Hola, <strong>{`${jsonData.nombre}`}</strong>. <br></br> A continuación podrás programar la reserva de tu turno:</p>
                    <CustomDropdown
                        name='service'
                        label='¿Qué servicio necesitas?'
                        control={control}
                        type='select'
                        error={errors.service}
                        placeholder='Selecciona una opción'
                        dropdownOptions={[
                            { value: '1', label: 'Servicio 1' },
                            { value: '2', label: 'Servicio 2' },
                        ]}
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
                            dropdownOptions={[
                                { value: '1', label: 'Categoria 1' },
                                { value: '2', label: 'Categoria 2' },
                            ]}
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
                            dropdownOptions={[
                                { value: '1', label: 'Sub categoria 1' },
                                { value: '2', label: 'Sub categoria 2' },
                            ]}
                            defaultValue={''}
                        />
                    )}
                    {subCategoryValue && (
                        <CustomDropdown
                            name='headquarters'
                            label='¿A cuál de las sedes vas a asistir?'
                            control={control}
                            type='select'
                            error={errors.headquarters}
                            placeholder='Selecciona una opción'
                            dropdownOptions={[
                                { value: '1', label: 'Sede 1' },
                                { value: '2', label: 'Sede 2' },
                            ]}
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
                            />
                        </div>
                    )}
                    <div className={styles.containerButtons}>
                        <CustomButton
                            name='submit'
                            type='submit'
                            label='Continuar'
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
        </div>
    )
}

export default ReservationPage