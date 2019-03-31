import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { Base } from '../Common/Base';

export class AuthRoute extends Base {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.getToken() ? true : false
    };
  }

  componentWillMount() {
    if (!this.state.auth) {
      const { history } = this.props;
      //   setTimeout(() => {
      //     history.replace('/login');
      //   }, 1000);
    }
  }

  componentDidMount() {
    // authPromise().then(result => {
    //   if (result == true) {
    //     this.setState({ auth: true});
    //   } else {
    //     this.setState({ auth: false});
    //   }
    // });
  }

  render() {
    let { component: Component, ...rest } = this.props;
    return this.state.auth ? (
      //   <Route {...rest} render={props => <Component {...props} />} />
      <Component {...this.props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: this.props.location }
        }}
      />
    );
  }
}
