import PropTypes from 'prop-types'

import styles from './CustomButton.module.css'

const CustomButton = ({ name, label, type = "button", onClick }) => {
    return (
        <button name={name} type={type} onClick={onClick} className={styles.customButton}>
            {label}
        </button>
    )
}

CustomButton.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.any
}

export default CustomButton