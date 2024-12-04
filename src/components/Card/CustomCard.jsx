import PropTypes from 'prop-types'

import styles from './CustomCard.module.css'

const CustomCard = ({
    title,
    message,
    backgroundColor = "#ffffff",
    color = "#000000",
    footer,
    onCardClick,
    buttonLabel = "Editar",
    buttonHidden = false,
    onButtonClick 
}) => {
    return (
        <div
            className={styles.customCard}
            style={{ backgroundColor: backgroundColor, color: color }}
            onClick={() => onCardClick?.()}
        >
            <div className={styles.customCardTitle}>{title}</div>
            <div className={styles.customCardMessage}>{message}</div>
            {footer && <div className={styles.customCardFooter}>{footer}</div>}
            <div className={styles.customCardButtonContainer}>
                <button
                    className={styles.customCardButton}
                    hidden={buttonHidden}
                    onClick={(e) => {
                        e.stopPropagation();
                        onButtonClick?.();
                    }}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}

CustomCard.propTypes = {
    title: PropTypes.node.isRequired,
    message: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    footer: PropTypes.node,
    onCardClick: PropTypes.func,
    buttonHidden: PropTypes.bool,
    buttonLabel: PropTypes.node,
    onButtonClick: PropTypes.func,
}

export default CustomCard