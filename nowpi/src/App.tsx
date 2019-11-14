import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import NetworkChecker from './components/NetworkChecker';
import UpdateChecker from './components/UpdateChecker';
import UpdateRunner from './components/UpdateRunner';
import NetworkPassword from './components/NetworkPassword';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact><NetworkChecker /></Route>
        <Route path="/NetworkPassword" exact><NetworkPassword /></Route>
        <Route path="/UpdateCheck" exact><UpdateChecker /></Route>
        <Route path="/UpdateRunner" exact><UpdateRunner /></Route>
      </Switch>
    </div>
  );
}

export default App;
