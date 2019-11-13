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