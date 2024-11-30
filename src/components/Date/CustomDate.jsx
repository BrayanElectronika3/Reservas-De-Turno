import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

import styles from './CustomDate.module.css'

const CustomDateTime = ({ name, label, control, type = "date", error }) => {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        id={name}
                        type={type}
                        {...field}
                        className={`${styles.date} ${error ? styles.isInvalid : ''}`}
                        value={field.value || ''}
                        onChange={(e) => { field.onChange(e) }}                        
                    />
                )}
            />
            {error ? (
                <p className={styles.errorMessage}>{error.message}</p>
            ) : (
                <div className={styles.placeholderSpace}></div>
            )}
        </div>
    )
}

CustomDateTime.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    type: PropTypes.string,
    error: PropTypes.object,
}

export default CustomDateTime
