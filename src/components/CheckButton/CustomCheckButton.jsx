import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

import styles from './CustomCheckButton.module.css'

const CustomCheckButton = ({ name, control, label, isChecked, error, disabled }) => {
    return (
        <div className={`${styles.formGroup}`}>
            <div className={`${styles.checkContainer}`}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        const { onChange, value } = field;
                        const isChecked = value || false;

                        const handleCheck = () => {
                            if (disabled) return;
                            const newCheckedState = !isChecked;
                            onChange(newCheckedState);
                        };

                        return (
                            <div
                                className={`${styles.checkButtonContainer} ${disabled ? styles.disabled : ''}`}
                                onClick={!disabled ? handleCheck : undefined}
                                role="button"
                                aria-pressed={isChecked}
                                aria-disabled={disabled}
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
                                        handleCheck();
                                    }
                                }}
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
                                />
                            </div>
                        );
                    }}
                />
                <label
                    className={`${styles.checkButtonLabel} ${isChecked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
                >
                    {label}
                </label>
            </div>
            {error ? (
                <p className={styles.errorMessage}>{error.message}</p>
            ) : (
                <div className={styles.placeholderSpace}></div>
            )}
        </div>
    )
}

CustomCheckButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isChecked: PropTypes.bool,
    error: PropTypes.object,
    disabled: PropTypes.bool,
}

export default CustomCheckButton