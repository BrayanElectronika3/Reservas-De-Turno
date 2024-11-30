import CustomButton from '../../components/Button/CustomButton'
import Logo from '../../components/Logos/Logo'
import LogoFooter from '../../components/Logos/LogoFooter'

import { formatDate } from '../../util/date'
import { getReservationData } from '../../util/localStorage'

import styles from './SummaryPage.module.css'

const SummaryPage = () => {
    const reservation = getReservationData()

    if (!reservation || Object.keys(reservation).length === 0) {
        console.log('Error al obtener los datos de reserva')
        return null
    }

    const { service, headquarters, date, time } = reservation

    const handleFinish = () => {
        // Una vez se obtenga la solicitud de registro redireccionar o cerrar la pestaña
        console.log('Finalizando reserva...')
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentCard}>
                    <Logo/>
                    <h1 className={styles.title}>Resumen de la reserva</h1>
                    <div className={styles.summary}>
                        {service ? (
                            <>
                                <p><strong>• Servicio:</strong> {service}</p>
                                <p><strong>• Sede:</strong> {headquarters}</p>
                                <p><strong>• Fecha de la reserva:</strong> {formatDate(date)}</p>
                                <p><strong>• Hora de la reserva:</strong> {time}</p>
                            </>
                        ) : (
                            <p>No hay datos de reserva disponibles.</p>
                        )}
                    </div>
                    <CustomButton name="buttonFinish" label="Finalizar" type="button" onClick={handleFinish} />
                </div>
                <LogoFooter/>
            </div>
        </div>
    )
}

export default SummaryPage