import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { createContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GetHomePage from './components/functional/GetHomePage';
import LoggedUserPage from './components/pages/LoggedUserPage';
import LoginPage from './components/pages/LoginPage';
import Navbar from './components/pages/Navbar';
import ProjectPage from './components/pages/ProjectPage';
import RegisterPage from './components/pages/RegisterPage';
import TitlePage from './components/pages/TitlePage';
import UserPage from './components/pages/UserPage';
import { darkPalette, getAntiShadows, lightPalette, overrides } from './resources/theme';

export const DarkModeContext = createContext<{ darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }>({} as any);
export const LoggedInContext = createContext<{ isLoggedIn: boolean, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }>({} as any);

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem('token') === '' ? false : true
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true' ? true : false
  );

  const defaultTheme = createMuiTheme();

  const theme = createMuiTheme({
    palette: darkMode ? darkPalette : lightPalette,
    shadows: darkMode ? getAntiShadows() : defaultTheme.shadows,
    overrides: darkMode ? overrides : undefined
  });


  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <LoggedInContext.Provider value={{ isLoggedIn, setLoggedIn }}>
          <CssBaseline>
            <Helmet>
              <title>Isshu.</title>
              <meta name="description" content="Minimalistic bug tracking tool for small sized teams" />
              <style>{`body { background-color: ${theme.palette.primary.main}; }`}</style>
            </Helmet>

            <Router>
              <Navbar />
              <Switch>
                <Route path="/home">
                  <GetHomePage />
                </Route>
                <Route path="/project/:projectId">
                  <ProjectPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/user/profile">
                  <LoggedUserPage />
                </Route>
                <Route path="/user/:userId">
                  <UserPage />
                </Route>
                <Route path="/">
                  <TitlePage />
                </Route>
              </Switch>
            </Router>
          </CssBaseline>
        </LoggedInContext.Provider>
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
