import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../actions/auth';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
              <Redirect
                  to={{
                      pathname: '/dashboard',
                      state: { from: props.location }
                  }}
              />

            ) : (
                  <Component {...props} />
            )
        }
    ></Route>
);

export default AuthRoute;
