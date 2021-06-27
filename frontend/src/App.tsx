import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import UsersList from './components/users-list';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/users">
          <UsersList/>
        </Route>
        <Route path="/">
            <h1>Not much here, really</h1>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
