import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { darkMode, DarkModeContext, setDarkMode, theme } from './resources/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
        <App />
      </DarkModeContext.Provider>
    </ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

