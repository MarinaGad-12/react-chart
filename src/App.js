import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import './sass/main.scss';

import Dashboard from './components/layout/dashboard';
import history from './components/history';
import lessonDetails from './components/layout/lessonDetails';

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <main history={history}>
            <Switch>
              <Route path="/dashboard/:id" component={lessonDetails} />
              <Route path="/dashboard" component={Dashboard} />
              <Redirect from="/" exact to="/dashboard" />
            </Switch>
          </main>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
