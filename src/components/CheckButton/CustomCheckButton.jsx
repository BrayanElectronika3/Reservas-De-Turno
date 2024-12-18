import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { Check } from 'lucide-react'

import styles from './CustomCheckButton.module.css'

const CustomCheckButton = ({ name, label, control, isChecked = false, error, disabled = false, link = false, href = '' }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.checkContainer}`}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const { onChange, value } = field
                        const isChecked = value || false
                        const handleCheck = () => {
                            if (disabled) return
                            const newCheckedState = !isChecked
                            onChange(newCheckedState)
                        }

                        return (
                            <div
                                className={`${styles.checkButtonContainer} ${disabled ? styles.disabled : ''}`}
                                onClick={!disabled ? handleCheck : undefined}
                                role="button"
                                aria-pressed={isChecked}
                                aria-disabled={disabled}
                                tabIndex={0}
                                onKeyPress={(e) => { if (!disabled && (e.key === ' ' || e.key === 'Enter')) { handleCheck() } }}
                            >
                                <input
                                    type="checkbox"
                                    className={styles.checkButtonInput}
                                    checked={isChecked}
                                    onChange={handleCheck}
                                    disabled={disabled}
                                    aria-checked={isChecked}
                                />
                                <span
                                    className={`${styles.checkBox} ${isChecked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
                                >
                                    { isChecked ? <Check size={15} color='white'/> : '' }
                                </span>
                            </div>
                        )
                    }}
                />
                <label className={`${styles.checkButtonLabel} ${isChecked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
                    {label} {link ? (<a href={href} target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faExternalLinkAlt} /> </a>) : ('') }
                </label>
            </div>
            {error ? <p className={styles.errorMessage}>{error.message}</p> : <div className={styles.placeholderSpace}></div>}
        </div>
    )
}

CustomCheckButton.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isChecked: PropTypes.bool,
    error: PropTypes.object,
    disabled: PropTypes.bool,
    link: PropTypes.bool,
    href: PropTypes.string,
}

export default CustomCheckButton