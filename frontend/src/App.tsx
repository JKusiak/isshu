import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import Navbar from './components/Navbar';
import ProjectsPage from './components/pages/ProjectsPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './components/pages/UserPage';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  return (
    <CssBaseline>
      <Router>
        <Navbar/>
        <Switch>
        <Route path="/home">
            <HomePage/>
        </Route>
        <Route path="/projects">
            <ProjectsPage/>
        </Route>
        <Route path="/addProject">
            
        </Route>
        <Route path="/profile">
            <UserProfile/>
        </Route>
        <Route path="/login">
            <LoginPage/>
        </Route>
        <Route path="/register">
            <RegisterPage/>
        </Route>
        <Route path="/register">
            
        </Route>
        </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
