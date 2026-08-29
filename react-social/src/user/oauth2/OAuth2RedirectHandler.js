import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom';

class OAuth2RedirectHandler extends Component {
  componentDidMount() {
    const token = this.getUrlParameter('token');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      window.location.reload(); // Reload the page after successful login
    }
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(this.props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  render() {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if (token) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location }
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: error
            }
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;