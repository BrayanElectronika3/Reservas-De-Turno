'use client'

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
    const navigate = useNavigate()

    const serviceValue = watch('service')
    const categoryValue = watch('category')
    const subCategoryValue = watch('subCategory')
    const headquartersValue = watch('headquarters')
    const dateTime = watch('dateTime')

    const onSubmit = (data) => { console.log(data) }

    const goBack = () => { navigate("/login", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <h1 className={styles.title}>Tu reserva</h1>
                    {/* Custom Dropdown - Servicio */}
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
                    {/*  Custom Dropdown - Categoria */}
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
                    {/* Custom Dropdown - Subcategoria */}
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
                    {/* Custom Dropdown - Sede */}
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
                    {/* Custom Date Time */}
                    {headquartersValue && (
                        <CustomDateTime
                            name='dateTime'
                            label='¿Cuál es la fecha y hora que deseas reservar?'
                            control={control}
                            type='datetime-local'
                            error={errors.dateTime}
                        />
                    )}
                    {/* Container Check Button */}
                    {dateTime && (
                        <div className={styles.containerCheck}>
                            {/* Check Button */}
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
                    {/* Container Buttons */} 
                    <div className={styles.containerButtons}>
                        {/* Button submit */}
                        <CustomButton
                            name='submit'
                            type='submit'
                            label='Continuar'
                        />
                        {/* Button Go Back */}
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