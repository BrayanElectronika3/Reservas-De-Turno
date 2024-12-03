'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import errorIcon from '../../assets/error-modal.png'
import delayIcon from '../../assets/delay-modal.png'

import Logo from '../../components/Logos/Logo'
import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'
import LogoFooter from '../../components/Logos/LogoFooter'
import CustomModal from '../../components/Modal/CustomModal'

import { schemaLogin } from '../../schemas/login.schema'
import { postUser } from '../../api/user'
import { mappingObject } from '../../util/object'
import { getWorkSpaceTenant, getDocumentType, setuser } from '../../util/localStorage'

import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin),
        shouldFocusError: true,
    })
    const navigate = useNavigate()

    // State
    const [documentData, setDocumentData] = useState([])
    const [modalState, setModalState] = useState({ 
        loading: false, 
        error: false, 
        title: '', 
        message: '', 
        button: false 
    })

    // Mostrar Error en pantalla
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

    // Fetch document types on mount
    useEffect(() => {
        const documentTypes = getDocumentType()
        if (!documentTypes) {
            showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
            return
        }
        setDocumentData(documentTypes)
    }, [])

    // Handle onSubmit
    const onSubmit = async (data) => {
        try {
            setModalState({ loading: true, error: false, title: '', message: '' })
            
            const keyMapping = { documentType: 'prefijo', documentNumber: 'identificacion' }
            const mappedData = mappingObject(data, keyMapping)
            const response = await postUser(mappedData)
        
            if (!response?.data) {
                console.log('User API request error')
                setuser(mappedData)
                setTimeout(() => showError('Lo sentimos', 'Usuario no encontrado.'), 2000)
                setTimeout(() => goRegister(), 3000)
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

        } catch (error) {
            console.error('Error en el proceso de login:', error)
            showError('Lo sentimos, algo salió mal', 'Intente realizar la acción nuevamente en unos minutos.')
        }
    }

    // Navigation functions
    const goBack = () => { navigate(`/${getWorkSpaceTenant()}`, { replace: true }) }
    const goRegister = () => { navigate("/register", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Logo/>
                        <h1 className={styles.title}>¿Quién eres?</h1>
                        <CustomDropdown 
                            name='documentType' 
                            label='Tipo de documento' 
                            control={control} 
                            type='select' 
                            error={errors.documentType} 
                            placeholder='Selecciona una opción' 
                            dropdownOptions={ documentData.map(item => ({ value: item.cod, label: item.value })) } 
                            defaultValue={''} 
                        />
                        <CustomInput 
                            name='documentNumber' 
                            label='Número de documento' 
                            control={control} type='number' 
                            error={errors.documentNumber} 
                            placeholder='123654789' 
                            defaultValue={''} 
                        />
                        <div className={styles.containerButtons}>
                            <CustomButton name='submit' label='Continuar' type='submit' />
                            <CustomButton name='buttonGoBack' label='Regresar' type='button' onClick={goBack} />
                        </div>
                    </form>
                    {modalState.loading && (
                        <CustomModal 
                            title='Verificando información'
                            description='Estamos validando los datos ingresados. Este proceso puede tardar unos segundos.'
                            src={delayIcon}
                            alt='Logo modal delay'
                        />
                    )}
                    {modalState.error && (
                        <CustomModal 
                            title={modalState.title}
                            description={modalState.message}
                            src={errorIcon}
                            alt='Logo modal error'
                        />
                    )} 
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default LoginPage