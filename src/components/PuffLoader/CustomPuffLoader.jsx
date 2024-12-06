import { PuffLoader } from 'react-spinners'

import styles from './CustomPuffLoader.module.css'

const CustomPuffLoader = () => {
    return (
        <div className={styles.loadingContainer}>
            <PuffLoader color="#5953a4" loading={true} size={50}/>
        </div>
    )
}

export default CustomPuffLoader