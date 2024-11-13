'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'
import Logo from '../../components/Logos/Logo'
import LogoFooter from '../../components/Logos/LogoFooter'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaLogin } from '../../schemas/login.schema'
import { getIDTenant, getDocumentType } from '../../util/localStorage'

import styles from './consultReservationPage.module.css'

const ConsultReservationPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schemaLogin), shouldFocusError: true})
    const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const documentType = getDocumentType()
        if (!documentType) return null
        setJsonData(documentType)
    }, [])

    const onSubmit = async (data) => {
        console.log('Consultando la reserva...')
        console.log(data)
        // Solicitud API para consultar la reserva del usuario por tipo y número de documento
        // goNext()
    }

    const goBack = () => { 
        const IDTenant = getIDTenant()
        navigate(`/${IDTenant}`, { replace: true }) 
    }
    // const goNext = () => { navigate("/summary", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>¿Quién eres?</h1>
                        <CustomDropdown name='documentType' label='Tipo de documento' control={control} type='select' error={errors.documentType} placeholder='Selecciona una opción' dropdownOptions={ jsonData.map(item => ({ value: item.cod, label: item.value })) } defaultValue={''} />
                        <CustomInput name='documentNumber' label='Número de documento' control={control} type='number' error={errors.documentNumber} placeholder='123654789' defaultValue={''} />
                        <div className={styles.containerButtons}>
                            <CustomButton name='submit' label='Consultar' type='submit' />
                            <CustomButton name='buttonGoBack' label='Regresar' type='button' onClick={goBack} />
                        </div>
                    </form>
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default ConsultReservationPage