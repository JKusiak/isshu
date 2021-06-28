import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ProjectsPage from './components/ProjectsPage';
import RegisterPage from './components/RegisterPage';
import UserProfile from './components/UserPage';


function App() {
  return (
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
  );
}

export default App;
