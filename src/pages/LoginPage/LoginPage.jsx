'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaLogin } from '../../schemas/login.schema'

import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schemaLogin), shouldFocusError: true});
    const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const documentType = localStorage.getItem('documentType')
        setJsonData(JSON.parse(documentType))
    }, []);

    const onSubmit = (data) => { 
        console.log(data)
        localStorage.setItem("authenticated", JSON.stringify(data))
        goNext()
    }

    const goBack = () => { navigate("/", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <h1 className={styles.title}>¿Quién eres?</h1>
                    {/* Custom Dropdown */}
                    <CustomDropdown
                        name='documentType'
                        label='Tipo de documento'
                        control={control}
                        type='select'
                        error={errors.documentType}
                        placeholder='Selecciona una opción'
                        dropdownOptions={ jsonData.map(item => ({ value: item.cod, label: item.value })) }
                        defaultValue={''}
                    />
                    {/* Custom input */}
                    <CustomInput 
                        name='documentNumber'
                        label='Número de documento'
                        control={control}
                        type='number'
                        error={errors.documentNumber}
                        placeholder='123654789'
                        defaultValue={''}
                    />
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

export default LoginPage