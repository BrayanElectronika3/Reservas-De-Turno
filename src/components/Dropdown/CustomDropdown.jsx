import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'

import styles from './CustomDropdown.module.css'

const CustomInput = ({ name, label, control, type = "select", error, placeholder, defaultValue, disabled = false, dropdownOptions }) => {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                disabled={disabled}
                render={({ field }) =>
                    <select
                        id={name}
                        type={type}
                        {...field}
                        className={`${styles.inputField} ${error ? styles.isInvalid : ""}`}
                    >
                        <option value="" className={`${styles.option}`}>{placeholder}</option>
                        {Array.isArray(dropdownOptions) && dropdownOptions.length > 0 && dropdownOptions.map((option) => (
                                <option key={option.value} value={option.value} className={`${styles.option}`}>
                                    {option.label}
                                </option>
                            ))
                        }
                    </select>
                }
            />
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
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    dropdownOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
}

export default CustomInput