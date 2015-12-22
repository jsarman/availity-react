import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import Validator from './middleware/validator';
import Page1 from './components/page1';
import Page2 from './components/page2';

import uikit from 'availity-uikit';


let createStoreWithMiddleware = applyMiddleware( createLogger(), Validator() )( createStore );
let store = createStoreWithMiddleware( rootReducer, {} );

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
                <div className="container-xs">
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3">
                            <h1 className="page-title">Welcome</h1>
                            <Page1 />
                        </div>
                    </div>
                </div>
            </Provider>
      );
  }
}





render( (
  <App />
  ), document.getElementById( 'main' ) );