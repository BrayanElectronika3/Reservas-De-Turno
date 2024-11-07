'use client'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import CustomDropdown from '../../components/Dropdown/CustomDropdown'
import CustomButton from '../../components/Button/CustomButton'
import CustomInput from '../../components/Input/CustomInput'
import CustomCheckButton from '../../components/CheckButton/CustomCheckButton'

import styles from './ReservationPage.module.css'

const ReservationPage = () => {
    const { control, handleSubmit, formState: { errors} } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => { console.log(data) }

    const goBack = () => { navigate("/login", { replace: true }) }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                {/* Title */}
                <h1 className={styles.title}>¿Quién eres?</h1>
                {/* Custom Dropdown */}
                <CustomDropdown
                    name="priorityAttention"
                    control={control}
                    label="¿Necesitas atención prioritaria?"
                    type="select"
                    placeholder="Selecciona una opción"
                    error={errors.priorityAttention}
                    dropdownOptions={[
                        { value: "1", label: "SI" },
                        { value: "0", label: "NO" },
                    ]}
                />
                {/* Cell Phone */}
                <CustomInput 
                    name={'cellPhone'}
                    label={'Número de celular'}
                    control={control}
                    type='number'
                    errors={errors}
                    placeholder={''}
                    defaultValue={''}
                />
                {/* Check Button */}
                <CustomCheckButton
                    label={'Acepta terminos y condiciones'}
                    disabled={false}
                    isChecked={false}
                />
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
    )
}

export default ReservationPage