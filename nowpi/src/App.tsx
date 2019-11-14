/**
 
===========================================================================

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

===========================================================================

Alex Lau
(c) Tecky Academy Limited 2019

===========================================================================

*/
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import NetworkChecker from './components/NetworkChecker';
import UpdateChecker from './components/UpdateChecker';
import UpdateRunner from './components/UpdateRunner';
import NetworkPassword from './components/NetworkPassword';
import NetworkSetup from './components/NetworkSetup';
import LaunchTV from './components/LaunchTV';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact><NetworkChecker /></Route>
        <Route path="/NetworkPassword" exact><NetworkPassword /></Route>
        <Route path="/NetworkSetup" exact><NetworkSetup /></Route>
        <Route path="/UpdateCheck" exact><UpdateChecker /></Route>
        <Route path="/UpdateRunner" exact><UpdateRunner /></Route>
        <Route path="/LaunchTV" exact><LaunchTV /></Route>
      </Switch>
    </div>
  );
}

export default App;
