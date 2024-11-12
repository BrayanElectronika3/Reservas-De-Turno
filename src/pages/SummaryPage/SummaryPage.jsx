import CustomButton from '../../components/Button/CustomButton'

import { formatDate } from '../../util/date'
import { getReservationData } from '../../util/localStorage'

import styles from './SummaryPage.module.css'

const SummaryPage = () => {
    const reservation = getReservationData()

    if (!reservation || Object.keys(reservation).length === 0) {
        console.log('Error al obtener los datos de reserva')
        return null
    }

    const { service, category, subCategory, headquarters, dateTime } = reservation

    const handleFinish = () => {
        // Una vez se obtenga la solicitud de registro redireccionar o cerrar la pestaña
        console.log('Finalizando reserva...')
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Resumen de la reserva</h1>
                <div className={styles.summary}>
                    {service ? (
                        <>
                            <p><strong>Servicio:</strong> {service}</p>
                            <p><strong>Categoria:</strong> {category}</p>
                            <p><strong>Sub Categoria:</strong> {subCategory}</p>
                            <p><strong>Sede:</strong> {headquarters}</p>
                            <p><strong>Fecha y hora de la reserva:</strong> {formatDate(dateTime)}</p>
                        </>
                    ) : (
                        <p>No hay datos de reserva disponibles.</p>
                    )}
                </div>
                <CustomButton name="buttonFinish" label="Finalizar" type="button" onClick={handleFinish} />
            </div>
        </div>
    )
}

export default SummaryPage