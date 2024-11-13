import farmatodoLogo from '../../assets/farmatodologo.svg'

import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.header}>
            <img src={farmatodoLogo} alt="Viturno logo" className={styles.logo} />
        </div>
    )
}

export default Logo