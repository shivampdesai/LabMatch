import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loginEmail: '',
        loginPassword: '',
        loginError: '',
        token: '',
        signInError: ''
    };


  }

  componentDidMount() {
    document.title = "Login | LabMatch"
    const token = getFromStorage('labMatcher');
      if (token) {
        //verify token
        fetch('/verify?token=' + token)
        .then (res => res.json())
        .then(json => {
          if (json.success){
            this.setState({
              token
            });

            window.location = '/home'
          }
        })


      }
  }

  login(){
    var email = document.getElementById('login-email').value
    var password = document.getElementById('login-password').value

    this.setState({
      loginEmail: email,
      loginPassword: password
    })

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.success){
        setInStorage('labMatcher', { token: json.token });
        window.location = '/home';
        console.log(json);
      }

      this.setState({
          signInError: 'Incorrect credentials!'
        })

    })
  }


  render() {


    return (
      <div>

      <section id="login-header-section">
          <h1 className="login-header-title">LabMatch</h1>
      </section>
      <section id="login-main-section"></section>
      <div className="container" id="login-main-container">

          <h5 className="text-center">{this.state.signInError}</h5>
          <div id="login-main-div"><input type="text" required="" placeholder="Email" inputMode="email" id="login-email" className="registration fields"/></div>
          <div id="login-main-div"><input type="password" required="" placeholder="Password"  id="login-password" className="registration fields"/></div>
          <div id="registration-div"><button className="btn btn-primary" type="button" id="login-button" onClick={() => this.login()}><span>LOGIN</span></button></div>
          <div className="text-center" style={{paddingTop: '20px'}}><a href="/signup">Don't have an account yet?</a></div>
      </div>


      </div>

    );

  }
}

export default Login;
