import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import Navbar from './components/pages/Navbar';
import AllProjectsPage from './components/pages/AllProjectsPage';
import RegisterPage from './components/pages/RegisterPage';
import LoggedUserPage from './components/pages/LoggedUserPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProjectPage from './components/pages/ProjectPage';
import UserPage from './components/pages/UserPage';



function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') === '' ? false : true
  );


  return (
    <CssBaseline>
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Switch>
          <Route path="/project/:id">
              <ProjectPage/>
          </Route>
          <Route path="/projects">
              <AllProjectsPage/>
          </Route>
          <Route path="/settings">
            Settings
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
          <Route path="/user/:id">
              <UserPage/>
          </Route>
          <Route path="/">
              <HomePage setLoggedIn={setLoggedIn}/>
          </Route>
        </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
