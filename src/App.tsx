import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Login } from './Login/Login';
import { Home } from './Home/Home';

import { createForm, formShape } from 'rc-form';

import { Route, Redirect, Switch } from 'react-router-dom';
import { Register } from './Register/Register';
import { AuthRoute } from './AuthRoute/AuthRoute';
import { About } from './About/About';

class App extends Component {
  render() {
 
    const LoginForm = createForm()(Login);
    const RegisterForm = createForm()(Register);

    return (
      <div className="App">
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route  component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
