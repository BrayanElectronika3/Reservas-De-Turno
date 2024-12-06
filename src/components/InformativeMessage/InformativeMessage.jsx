import { CalendarCheck, BookOpenCheck, CircleCheckBig } from 'lucide-react'
import PropTypes from 'prop-types'

import styles from './InformativeMessage.module.css'

const messages = [
    { key: 1, icon: <CalendarCheck size={18}/>, text: "Reservar el turno para gestionar tu tiempo y tener prioridad en la fila para la atención." },
    { key: 2, icon: <BookOpenCheck size={18}/>, text: "Consultar o editar la fecha y hora de la reserva." },
    { key: 3, icon: <CircleCheckBig size={18}/>, text: "Crear tu reserva." }
]

const MessageItem = ({ icon, text }) => ( <p className={styles.item}>{icon} {text}</p> )

MessageItem.propTypes = {
    icon: PropTypes.node,
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