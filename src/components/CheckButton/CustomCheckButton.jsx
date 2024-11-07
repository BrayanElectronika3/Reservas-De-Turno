import { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './CustomCheckButton.module.css'

const CustomCheckButton = ({ label, isChecked, onChange, disabled }) => {
    const [checked, setChecked] = useState(isChecked);

    const handleCheck = () => {
        if (disabled) return;
        const newCheckedState = !checked;        
        setChecked(newCheckedState);
        onChange && onChange(newCheckedState);
    };

    return (
        <div className={`${styles.checkContainer}`}>
            <div
                className={`${styles.checkButtonContainer} ${disabled ? styles.disabled : '' }`}
                onClick={!disabled ? handleCheck : undefined}
                role="button"
                aria-pressed={checked}
                aria-disabled={disabled}
                tabIndex={0}
                onKeyPress={(e) => { if (!disabled && (e.key === ' ' || e.key === 'Enter')) { handleCheck() } }}
            >
                <input
                    type="checkbox"
                    className={styles.checkButtonInput}
                    checked={checked}
                    onChange={handleCheck}
                    disabled={disabled}
                    aria-checked={checked}
                />
                <span
                    className={`${styles.checkBox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''} `}
                />
            </div>
            <label className={`${styles.checkButtonLabel} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
                {label}
            </label>
        </div>
    )
}

CustomCheckButton.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}

export default CustomCheckButton