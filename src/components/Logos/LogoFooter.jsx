import { useContext } from 'react'
import { ThemeContext } from '../../useThemeContext'

import viTurnoLogo from '../../assets/viturnologo.png'
import viTurnoLogoBlanco from '../../assets/viturnologoblanco.png'

import styles from './LogoFooter.module.css'

const LogoFooter = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={styles.footer}>
            Powered by 
            <a href="https://viturno.com/" target="_blank" className={styles.link}> 
                { theme === 'light' &&
                    <img src={viTurnoLogo} alt="Viturno logo" className={styles.logo}/> 
                }
                { theme === 'dark' &&
                    <img src={viTurnoLogoBlanco} alt="Viturno logo blanco" className={styles.logo}/> 
                }
            </a>
        </div>
    )
}

export default LogoFooter