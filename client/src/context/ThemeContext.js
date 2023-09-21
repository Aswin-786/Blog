const { createContext, useState } = require("react");

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark')
  const toggle = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
  }
  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  )
}