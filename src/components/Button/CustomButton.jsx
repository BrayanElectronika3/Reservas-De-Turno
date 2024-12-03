import PropTypes from 'prop-types'

import styles from './CustomButton.module.css'

const CustomButton = ({ name, label, type = "button", onClick, disabled = false }) => {
    return (
        <button name={name} type={type} onClick={onClick} className={styles.customButton} disabled={disabled}>
            {label}
        </button>
    )
}

CustomButton.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.any
}

export default CustomButton