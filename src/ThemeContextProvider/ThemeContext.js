import {createContext, useContext, useState} from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme)
  }

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
