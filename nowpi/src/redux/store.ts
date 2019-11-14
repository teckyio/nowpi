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
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { ConfigState, configReducer } from './config/reducer';
import { ConfigActions } from './config/action';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history';

export interface RootState {
  config: ConfigState;
  router: RouterState;
}

type RootActions = ConfigActions;

export const configureStore = (history: History) => {
  const rootReducers = combineReducers<RootState>({
    config: configReducer,
    router: connectRouter(history)
  })

  const store = createStore<RootState, RootActions, {}, {}>(rootReducers, 
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    )
  );

  return store;
}