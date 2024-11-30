import { Controller } from "react-hook-form"
import PropTypes from "prop-types"

import styles from "./CustomTime.module.css"

const CustomTimePicker = ({ name, label, control, type = "select", interval = 30, twelveHourFormat = false, placeholder, availableTimes = [], defaultValue, error }) => {
    // Funcion para generar los intervalos de tiempohoras
    const generateTimeIntervals = (interval, twelveHourFormat) => {
        const times = []

        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date()
        end.setHours(23, 59, 59, 999)

        if (!twelveHourFormat) {
            // Convertir horas a formato 24 horas
            while (start <= end) {
                const formattedTime = start.toTimeString().split(" ")[0].slice(0, 5)
                times.push(formattedTime)
                start.setMinutes(start.getMinutes() + interval)
            }

        } else {
            // Convertir horas a formato 12 horas y determinar AM/PM
            while (start <= end) {
                const hours = start.getHours()
                const minutes = start.getMinutes()
    
                const period = hours >= 12 ? "PM" : "AM"
                const formattedHours = hours % 12 || 12
                const formattedMinutes = minutes.toString().padStart(2, "0")
    
                const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`
                times.push(formattedTime)
    
                start.setMinutes(start.getMinutes() + interval)
            }
        }
        return times

    }

    const timeOptions = generateTimeIntervals(interval, twelveHourFormat)

    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) =>
                <select
                    id={name}
                    type={type}
                    {...field}
                    className={`${styles.inputField} ${error ? styles.isInvalid : ""}`}
                >
                        <option value="" className={`${styles.option}`}>{placeholder}</option>
                        {Array.isArray(timeOptions) && timeOptions.length > 0 && timeOptions.map((option) => (
                                <option 
                                    key={option} 
                                    value={option} 
                                    className={`${styles.option}`}
                                    disabled={!availableTimes.includes(option)}
                                >
                                    {option} {!availableTimes.includes(option) ? "(No disponible)" : ""}
                                </option>
                            ))
                        }
                    </select>                    
                }
            />
            {error ? (
                <p className={styles.errorMessage}>{error.message}</p>
            ) : (
                <div className={styles.placeholderSpace}></div>
            )}
        </div>
    )
}

CustomTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    type: PropTypes.string,
    interval: PropTypes.number,
    twelveHourFormat: PropTypes.bool,
    availableTimes: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.object,
    placeholder: PropTypes.string,
}

export default CustomTimePicker