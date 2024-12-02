import PropTypes from 'prop-types'

import CustomButton from '../Button/CustomButton'

import styles from './CustomModal.module.css'

const CustomModal = ({ title, description, src, alt, showButton, onButtonClick }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div>
                    <img src={src} alt={alt} className={styles.logo} />
                    <h1 className={styles.title}>{title}</h1>
                </div>
                <p>{description}</p>
                {showButton && (
                    <CustomButton 
                        name='closeModal' 
                        label='Cerrar' 
                        type='button' 
                        onClick={onButtonClick} 
                    />
                )}
            </div>
        </div>
    )
}

CustomModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    src: PropTypes.string,
    alt: PropTypes.string,
    showButton: PropTypes.bool,
    onButtonClick: PropTypes.func,
}

export default CustomModal