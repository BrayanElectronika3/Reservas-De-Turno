import viTurnoLogo from '../../assets/viturnologo.png'

import styles from './LogoFooter.module.css'

const LogoFooter = () => {
    return (
        <div className={styles.footer}>
            Powered by <a href="https://viturno.com/" target="_blank" className={styles.link}> <img src={viTurnoLogo} alt="Viturno logo" className={styles.logo}/> </a>
        </div>
    )
}

export default LogoFooter