'use client'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaRegister } from '../../schemas/register.schema'

import styles from './RegisterPage.module.css'

const RegisterPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schemaRegister), shouldFocusError: true});
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        goNext()
    }

    const goBack = () => { navigate("/", { replace: true }) }
    const goNext = () => { navigate("/reservation", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    <h1 className={styles.title}>Registro</h1>
                    {/* Custom input - Primer Nombre */}
                    <CustomInput 
                        name='firstName'
                        label='Primer nombre'
                        control={control}
                        type='text'
                        error={errors.firstName}
                        placeholder='Ingrese su primer nombre'
                        defaultValue={''}
                    />
                    {/* Custom input - Segundo Nombre */}
                    <CustomInput 
                        name='secondName'
                        label='Segundo nombre'
                        control={control}
                        type='text'
                        error={errors.secondName}
                        placeholder='Ingrese su segundo nombre'
                        defaultValue={''}
                    />
                    {/* Custom input - Primer Apellido */}
                    <CustomInput 
                        name='firstLastName'
                        label='Primer apellido'
                        control={control}
                        type='text'
                        error={errors.firstLastName}
                        placeholder='Ingrese su primer apellido'
                        defaultValue={''}
                    />
                    {/* Custom input - Segundo Apellido */}
                    <CustomInput 
                        name='secondLastName'
                        label='Segundo apellido'
                        control={control}
                        type='text'
                        error={errors.secondLastName}
                        placeholder='Ingrese su segundo apellido'
                        defaultValue={''}
                    />
                    {/* Custom input - Correo */}
                    <CustomInput 
                        name='email'
                        label='Correo'
                        control={control}
                        type='text'
                        error={errors.email}
                        placeholder='Ingrese su correo'
                        defaultValue={''}
                    />
                    {/* Custom input - Celular */}
                    <CustomInput 
                        name='cellPhone'
                        label='Celular'
                        control={control}
                        type='number'
                        error={errors.cellPhone}
                        placeholder='Ingrese su celular'
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

export default RegisterPage