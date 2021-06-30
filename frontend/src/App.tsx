import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import Navbar from './components/pages/Navbar';
import ProjectsPage from './components/pages/ProjectsPage';
import RegisterPage from './components/pages/RegisterPage';
import UserProfile from './components/pages/UserPage';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  return (
    <CssBaseline>
      <Router>
        <Navbar/>
        <Switch>
        <Route path="/projects">
            <ProjectsPage/>
        </Route>
        <Route path="/addProject">
          AddProject
        </Route>
        <Route path="/profile">
            <UserProfile/>
        </Route>
        <Route path="/settings">
          Settings
        </Route>
        <Route path="/login">
            <LoginPage/>
        </Route>
        <Route path="/register">
            <RegisterPage/>
        </Route>
        <Route path="/">
            <HomePage/>
        </Route>
        </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
