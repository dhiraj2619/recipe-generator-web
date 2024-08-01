import { createTheme, CssBaseline } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const themeContext = createContext();


const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');


    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode
            }
        }),
        [mode]
    )

    const toggleTheme = () => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
    }
    return (
        <themeContext.Provider value={{ mode, toggleTheme,theme}}>
                <CssBaseline />
                {children}
            
        </themeContext.Provider>
    )
}


export default ThemeContextProvider