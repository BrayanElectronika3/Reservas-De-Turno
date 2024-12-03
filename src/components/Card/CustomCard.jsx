import PropTypes from 'prop-types'

import styles from './CustomCard.module.css'

const CustomCard = ({ title, message, backgroundColor = "#ffffff", color = "#000000", footer, onCardClick }) => {
    return (
        <div
            className={styles.customCard}
            style={{ backgroundColor: backgroundColor, color: color }}
            onClick={() => onCardClick?.()}
        >
            <div className={styles.customCardTitle}>{title}</div>
            <div className={styles.customCardMessage}>{message}</div>
            {footer && <div className={styles.customCardFooter}>{footer}</div>}
        </div>
    )
}

CustomCard.propTypes = {
    title: PropTypes.node.isRequired,
    message: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    footer: PropTypes.node,
    onCardClick: PropTypes.func
}

export default CustomCard