import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from './useThemeContext'

export const ThemeProvider = ({ children }) => {
    const getPreferredTheme = () => { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }
    
    const [theme, setTheme] = useState(getPreferredTheme())
    // const [theme, setTheme] = useState('light')
    const [color, setColor] = useState('1')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (event) => { setTheme(event.matches ? 'dark' : 'light') }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])
    
    const toggleTheme = () => { setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light')) }

    const changeColor = (newColor) => { setColor(newColor) }    
    
    return (
        <ThemeContext.Provider value={{ theme, color, toggleTheme, changeColor }}>
            <div data-theme={theme} data-color={color}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node
}