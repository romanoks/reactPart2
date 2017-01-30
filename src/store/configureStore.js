import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import createThunkMiddleware from './middleware/thunk';
import exceptionHandler from 'errors/exceptionHandler';

export default function configureStore(initialState) {
  const thunk = createThunkMiddleware(exceptionHandler);
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
