'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { squemaLogin } from '../../schemas/login.schema'

import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors} } = useForm({ resolver: zodResolver(squemaLogin) });
    const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const documentType = localStorage.getItem('documentType')
        setJsonData(JSON.parse(documentType))
    }, []);

    const onSubmit = (data) => { 
        localStorage.setItem("authenticated", JSON.stringify(data))
        goNext()
        console.log(data)
    }

    const goBack = () => { navigate("/", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                {/* Title */}
                <h1 className={styles.title}>¿Quién eres?</h1>
                {/* Custom Dropdown */}
                <CustomDropdown
                    name="documentType"
                    control={control}
                    label="Tipo de documento"
                    type="select"
                    placeholder="Selecciona una opción"
                    error={errors.documentType}
                    dropdownOptions={ jsonData.map(item => ({ value: item.cod, label: item.value })) }
                />
                {/* Custom input */}
                <CustomInput 
                    name={'documentNumber'}
                    label={'Número de documento'}
                    control={control}
                    type='number'
                    errors={errors}
                    placeholder={'123654789'}
                    defaultValue={''}
                />
                {/* Container Buttons */}
                <div className={styles.containerButtons}>    
                    {/* Button submit */}
                    <CustomButton
                        name={'buttonSubmitLogin'}
                        label={'Continuar'}
                        type='submit'
                        onClick={handleSubmit(onSubmit)}
                    />
                    {/* Button Go Back */}
                    <CustomButton
                        name={'buttonGoBackLogin'}
                        label={'Regresar'}
                        type='submit'
                        onClick={goBack}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage