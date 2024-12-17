'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import Logo from '../../components/Logos/Logo'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { mappingObject, cleanObject } from '../../util/object'
import { getUser, setuser } from '../../util/localStorage'
import { schemaRegister } from '../../schemas/register.schema'
import { postCreateUserData } from '../../api/user'

import styles from './RegisterPage.module.css'

// Key Mapping
const keyMapping = { 
    prefijo: 'tipoIdentificacion', 
    identificacion: 'identificacion',
    firstName: 'primerNombre',
    secondName: 'segundoNombre',
    firstLastName: 'primerApellido',
    secondLastName: 'segundoApellido',
    email: 'email',
    cellPhone: 'telefono',
}

const RegisterPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ 
        resolver: zodResolver(schemaRegister), 
        shouldFocusError: true
    })
    const navigate = useNavigate()
    const [modalState, setModalState] = useState({ 
        loading: false, 
        error: false, 
        title: '', 
        message: '', 
        button: false 
    })

    // Error handler
    const showError = (title, message, button = false) => {
        setModalState(prev => ({
            ...prev,
            loading: false,
            error: true, 
            title,
            message,
            button
        }))
    }

    const closeErrorModal = () => {
        setModalState(prev => ({ 
            ...prev, 
            loading: false, 
            error: false, 
            title: '', 
            message: '',
            button: false
        }))
    }

    // Handle Submit - Register and redireccion
    const onSubmit = async (data) => {
        setModalState({ loading: true, error: false, title: '', message: '' })

        const userObject = getUser() // Obtiene datos del usuario
        const userData = mappingObject(userObject, keyMapping) // Mapea datos del usuario
        const dataForm = mappingObject(data, keyMapping) // Mapea datos del formulario
        const combinedData = { ...userData, ...dataForm, vip: 0 } // Combina los datos
        const registerData = cleanObject(combinedData) // Limpia las claves sin valores

        const response = await postCreateUserData(registerData)
        
        if (response?.error === 1) {
            console.log('User API request error')
            setuser(registerData)
            showError('Lo sentimos', 'Intente realizar la acción nuevamente en unos minutos. Si el problema persiste, por favor, contacte a nuestro equipo de soporte.', true)
            return

        } else if (response?.error === 2 ) {
            console.log('User API request error')
            setuser(registerData)
            showError('Lo sentimos', 'El usuario se encuentra registrado', true)
            return
        }

        const { primerApellido, segundoApellido, primerNombre, segundoNombre, identificacion, tipoIdentificacion, id } = response.data
        const user = {
            nombre: `${primerApellido} ${segundoApellido} ${primerNombre} ${segundoNombre}`.trim(),
            identificacion,
            tipoIdentificacion,
            id,
        }
    
        setuser(user)
        setTimeout(() => goNext(), 2000)
    }

    const goBack = () => { navigate("/login", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>Registro</h1>
                        <div className={styles.containerInput}>
                            <CustomInput 
                                name='firstName' 
                                label='Primer nombre' 
                                control={control} 
                                type='text' 
                                error={errors.firstName} 
                                placeholder='Ingrese su primer nombre' 
                                defaultValue={''} 
                            />
                            <CustomInput 
                                name='secondName' 
                                label='Segundo nombre' 
                                control={control} 
                                type='text' 
                                error={errors.secondName} 
                                placeholder='Ingrese su segundo nombre' 
                                defaultValue={''} 
                            />
                        </div>
                        <div className={styles.containerInput}>
                            <CustomInput 
                                name='firstLastName' 
                                label='Primer apellido' 
                                control={control} 
                                type='text' 
                                error={errors.firstLastName} 
                                placeholder='Ingrese su primer apellido' 
                                defaultValue={''} 
                            />
                            <CustomInput 
                                name='secondLastName' 
                                label='Segundo apellido' 
                                control={control} 
                                type='text' 
                                error={errors.secondLastName} 
                                placeholder='Ingrese su segundo apellido' 
                                defaultValue={''} 
                            />
                        </div>
                        <div className={styles.containerInput}>
                            <CustomInput 
                                name='email' 
                                label='Correo' 
                                control={control} 
                                type='text' 
                                error={errors.email} 
                                placeholder='Ingrese su correo' 
                                defaultValue={''} 
                            />
                            <CustomInput 
                                name='cellPhone' 
                                label='Celular' 
                                control={control} 
                                type='number' 
                                error={errors.cellPhone} 
                                placeholder='Ingrese su celular' 
                                defaultValue={''} 
                            />
                        </div>
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
                    {modalState.loading && (
                        <CustomModal 
                            title='Verificando información'
                            description='Estamos validando los datos ingresados. Este proceso puede tardar unos segundos.'
                        />
                    )}
                    {modalState.error && (
                        <CustomModal 
                            title={modalState.title}
                            description={modalState.message}
                            error={true}
                            showButton={modalState.button}
                            onButtonClick={closeErrorModal}
                        />
                    )} 
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default RegisterPage