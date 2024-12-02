import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

// Animacion
const Animated = ({ children }) => {
    const pageVariants = { initial: { opacity: 0, x: 500 }, enter: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -500 }, }
    const pageTransition = { type: 'tween', ease: 'anticipate', duration: 1.5, }
    const handleAnimationStart = () => { document.body.style.overflow = 'hidden' }
    const handleAnimationComplete = () => { document.body.style.overflow = '' }

    return (
        <motion.div 
            initial="initial" 
            animate="enter" 
            exit="exit" 
            variants={pageVariants} 
            transition={pageTransition} 
            onAnimationStart={handleAnimationStart} 
            onAnimationComplete={handleAnimationComplete}
        > 
            {children} 
        </motion.div>
    )
}

Animated.propTypes = {
    children: PropTypes.node
}

export default Animated