'use client'

import { useForm } from 'react-hook-form'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomInput from '../../components/Input/CustomInput'
import CustomButton from '../../components/Button/CustomButton'

import styles from './LoginPage.module.css'

const LoginPage = () => {
    const { control, handleSubmit, formState: { errors} } = useForm();

    const onSubmit = (data) => { console.log(data) }

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
                    dropdownOptions={[
                        { value: "cc", label: "Cédula de ciudadanía" },
                        { value: "ce", label: "Cédula de extranjería" },
                        { value: "pas", label: "Pasaporte (Digita sólo números)" },
                        { value: "ti", label: "Tarjeta de identidad" },
                        { value: "nit", label: "NIT" },
                    ]}
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
                {/* Button submit */}
                <CustomButton
                    name={'buttonSubmitLogin'}
                    label={'Continuar'}
                    type='submit'
                    onClick={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    )
}

export default LoginPage