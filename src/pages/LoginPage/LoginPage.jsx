'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaLogin } from '../../schemas/login.schema'
import { userFetch } from '../../api/user'
import { getTenantData, getDocumentType, setuser } from '../../util/localStorage'
import { mappingObject } from '../../util/mappingObject'

import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schemaLogin), shouldFocusError: true})
    const [jsonData, setJsonData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const documentType = getDocumentType()
        if (!documentType) return null
        setJsonData(documentType)
    }, [])

    const onSubmit = async (data) => {  
        console.log(data)
                  
        const keyMapping = {
            documentType: 'prefijo',
            documentNumber: 'identificacion'
        }

        const object = mappingObject(data, keyMapping)
        const response = await userFetch(object)

        if (!response && !response?.data) {
            console.log('Error en solicitud API de usuarios')
            return null
        }

        if (response.data === null) {
            goRegister()
            return null
        }

        const { primerApellido, segundoApellido, primerNombre, segundoNombre, identificacion, tipoIdentificacion }  = response.data
        const user = {
            "nombre": `${primerApellido} ${segundoApellido} ${primerNombre} ${segundoNombre}`.trim(),
            "identificacion": identificacion,
            "tipoIdentificacion": tipoIdentificacion
        }

        setuser(user)
        goNext()
    }

    const goBack = () => { 
        const IDTenant = getTenantData()
        navigate(`/${IDTenant}`, { replace: true }) 
    }
    const goRegister = () => { navigate("/register", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.title}>¿Quién eres?</h1>
                    <CustomDropdown name='documentType' label='Tipo de documento' control={control} type='select' error={errors.documentType} placeholder='Selecciona una opción' dropdownOptions={ jsonData.map(item => ({ value: item.cod, label: item.value })) } defaultValue={''} />
                    <CustomInput name='documentNumber' label='Número de documento' control={control} type='number' error={errors.documentNumber} placeholder='123654789' defaultValue={''} />
                    <div className={styles.containerButtons}>
                        <CustomButton name='submit' label='Continuar' type='submit' />
                        <CustomButton name='buttonGoBack' label='Regresar' type='button' onClick={goBack} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage