'use client'

// import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaReservation } from '../../schemas/reservation.schema'

import styles from './ReservationPage.module.css'

const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schemaReservation), shouldFocusError: true})
    // const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     // Pendiente la API aca
    //     const documentTypes = localStorage.getItem('documentType')
    //     setJsonData(JSON.parse(documentTypes))
    // }, [])

    const onSubmit = (data) => { 
        console.log(data)
    }

    const goBack = () => { navigate("/login", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <h1 className={styles.title}>¿Quién eres?</h1>
                    {/* Custom Dropdown */}
                    <CustomDropdown
                        name='priorityAttention'
                        label='¿Necesitas atención prioritaria?'
                        control={control}
                        type='select'
                        error={errors.priorityAttention}
                        placeholder='Selecciona una opción'
                        dropdownOptions={[
                            { value: 'SI', label: 'SI' },
                            { value: 'NO', label: 'NO' },
                        ]}
                        defaultValue={''}
                    />
                    {/* Cell Phone */}
                    <CustomInput 
                        name='cellPhoneNumber'
                        label='Número de celular'
                        control={control}
                        type='number'
                        error={errors.cellPhoneNumber}
                        placeholder=''
                        defaultValue={''}
                    />
                    {/* Container Check Button */}
                    <div className={styles.containerCheck}>
                        {/* Check Button */}
                        <CustomCheckButton
                            label='Acepta terminos y condiciones'
                            // name="termsAndConditions"
                            // control={control}
                            disabled={false}
                            isChecked={false}
                        />
                    </div>
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