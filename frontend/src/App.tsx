import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import ProjectsPage from './components/ProjectsPage';
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
      <Route path="/profile">
          <UserProfile/>
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
