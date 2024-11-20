import NotFoundImage from '../../assets/404.svg'

import styles from './NotFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <div className={styles.notFoundContainer}>
            <img src={NotFoundImage} alt="Not found image" className={styles.responsiveImage}/>
            <h1>Página no encontrada</h1>
        </div>
    )
}

export default NotFoundPage