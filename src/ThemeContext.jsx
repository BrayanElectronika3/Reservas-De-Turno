import { useState,  } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from './useThemeContext'

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [color, setColor] = useState('1')

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