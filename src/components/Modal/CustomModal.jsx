import PropTypes from 'prop-types'

import errorIcon from '../../assets/error-modal.png'

import CustomPuffLoader from '../PuffLoader/CustomPuffLoader'
import CustomButton from '../Button/CustomButton'

import styles from './CustomModal.module.css'

const CustomModal = ({ title, description, error = false, showButton, onButtonClick }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div>
                    { error ? (
                        <img src={errorIcon} alt={'Logo modal error'} className={styles.logo}/>
                    ) : (
                        <CustomPuffLoader/>
                    )
                    }
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
    error: PropTypes.bool,
    showButton: PropTypes.bool,
    onButtonClick: PropTypes.func,
}

export default CustomModal