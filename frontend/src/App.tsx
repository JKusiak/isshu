import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProjectsPage from './components/pages/AllProjectsPage';
import HomePage from './components/pages/HomePage';
import LoggedUserPage from './components/pages/LoggedUserPage';
import LoginPage from './components/pages/LoginPage';
import Navbar from './components/pages/Navbar';
import ProjectPage from './components/pages/ProjectPage';
import RegisterPage from './components/pages/RegisterPage';
import UserPage from './components/pages/UserPage';
import { darkPalette, lightPalette } from './resources/theme';

export const DarkModeContext = createContext<{darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>}>({} as any);

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem('token') === '' ? false : true
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true'? true : false
  );
  
  const theme = createMuiTheme({
    palette: darkMode? darkPalette : lightPalette
  });


  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
        <CssBaseline>
          <Router>
            <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Switch>
              <Route path="/projects/:projectId">
                  <ProjectPage/>
              </Route>
              <Route path="/projects">
                  <AllProjectsPage/>
              </Route>
              <Route path="/login">
                  <LoginPage setLoggedIn={setLoggedIn}/>
              </Route>
              <Route path="/register">
                  <RegisterPage/>
              </Route>
              <Route path="/user/profile">
                  <LoggedUserPage/>
              </Route>
              <Route path="/user/:userId">
                  <UserPage/>
              </Route>
              <Route path="/">
                  <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
              </Route>
            </Switch>
          </Router>
        </CssBaseline>
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
