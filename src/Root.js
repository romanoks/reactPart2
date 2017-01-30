import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';

import main from 'layouts/main'
import HomePage from 'containers/Home/HomePage';
import MessageFormPage from 'containers/MessageFormCU/MessageFormPage';
import NotFoundPage from 'containers/NotFound/NotFound';


export const Path = {
    root: '/',
    persmesscu: 'persistantmessage(/:id)'
};
const store = configureStore();

export default () =>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={Path.root} component={main} >
      	<IndexRoute component={HomePage}/>
      	<Route path={Path.persmesscu} component={MessageFormPage} />
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Router>
  </Provider>;
