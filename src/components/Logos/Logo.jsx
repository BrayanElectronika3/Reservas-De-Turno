import tenantLogo from '../../assets/farmatodologo.svg'

import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.header}>
            <img src={tenantLogo} alt="Tenant logo" className={styles.logo} />
        </div>
    )
}

export default Logo