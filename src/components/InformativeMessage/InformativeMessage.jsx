import PropTypes from 'prop-types'

import styles from './InformativeMessage.module.css'

const messages = [
    { key: 1, icon: "📆", text: "Reservar el turno para gestionar tu tiempo y tener prioridad en la fila para la atención." },
    { key: 2, icon: "✍️", text: "Modificar o eliminar tu reserva." },
    { key: 3, icon: "💎", text: "Ver el número del turno reservado." },
    { key: 4, icon: "✅", text: "Activar el turno." }
]

const MessageItem = ({ icon, text }) => ( <p className={styles.item}>{icon} {text}</p> )

MessageItem.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export const InformativeMessage = () => {
    return (
        <div>
            <h2 className={styles.titleCard}>Aquí podrás:</h2>
            {messages.map((message) => (<MessageItem key={message.key} icon={message.icon} text={message.text} />))}
        </div>
    )
}

export default InformativeMessage