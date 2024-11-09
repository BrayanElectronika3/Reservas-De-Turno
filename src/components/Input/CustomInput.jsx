import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'

import styles from './CustomInput.module.css'

const CustomInput = ({ name, label, control, type = "text", error, placeholder, defaultValue}) => {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <Controller 
                name={name} 
                control={control} 
                defaultValue={defaultValue}
                render={({ field}) => 
                    <input 
                        id={name} 
                        type={type} 
                        placeholder={placeholder}
                        {...field} 
                        className={`${styles.inputField} ${error ? styles.isInvalid : ""}`}
                    />
            }/>
            {error ? <p className={styles.errorMessage}>{error.message}</p> : <div className={styles.placeholderSpace}></div>}
        </div>
    )
}

CustomInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    type: PropTypes.string,
    error: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.string ])
}

export default CustomInput