import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, Redirect } from 'react-router'
//import { createHistory, useBasename } from 'history'

import Page1 from './components/page1';
import Page2 from './components/page2';

//require('availity-uikit');
//require('jquery');
// const history = useBasename(createHistory)({
//     basename: '/'
// })

class App extends React.Component {
    render() {
        return (
            <div className="container-sm">
        <h1 className="page-title">Welcome</h1>
                <div role="tabpanel">
            <ul className="nav nav-tabs" role="tablist">
                <li><Link to="/page1" activeClassName="active">Page 1</Link></li>
                <li><Link to="/page2" activeClassName="active">Page 2</Link></li>
            </ul>
            </div>
            {this.props.children}
          </div>
            )
    }
}

render((
    <Router >
    <Route path="/" component={App}>
      <Route path="page1" component={Page1} />
      <Route path="page2" component={Page2} />
    </Route>
  </Router>
    ), document.getElementById('main'))