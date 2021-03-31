import React from 'react';
import InputField from './InputField.js';
import SubmitBtn from './SubmitBtn.js';
import Userstore from '../Stores/Userstore.js';

class LoginForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          username: '',
          passowrd: '',
          buttonDisabled: false
      }
    }

    setInputValue(property, val) {
      val = val.trim();
      if (val.length > 12) {
        return;
      }
      this.setState({
          [property]: val
      })
    }

    resetFrom() {
      this.setState({
        username: '',
        passowrd: '',
        buttonDisabled: false
      })
    }


   async doLogin() {

    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try {

      let res = await fetch('/login',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if (result && result.success) {
        Userstore.isLoggenin = true;
      }

      else if (result && result.success === false ) {
        this.resetFrom();
        alert(result.msg);
      }
    }

    catch(e) {
      console.log(e);
      this.resetFrom();

    }

   }
    
    render() {
        return (   

              <div className="row justify-content-center">

                  <div className="col-xl-10 col-lg-12 col-md-9">

                      <div className="card o-hidden border-0 shadow-lg my-5">
                          <div className="card-body p-0">
                              <div className="row">
                                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                  <div className="col-lg-6">
                                      <div className="p-5">
                                          <div className="text-center">
                                              <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                          </div>
                                          <form className="user">
                                              <div className="form-group">
                                                <InputField type="text" vaule={this.state.username ? this.state.username : ''} placeholder="Username" onChange={ (val) => this.setInputValue('username', val) } />
                                              </div>
                                              <div className="form-group">
                                                <InputField type="password" value={this.state.password ? this.state.password : ''} placeholder="Enter Password" onChange={ (val) => this.setInputValue('password', val) } />       
                                              </div>
                                              <div className="form-group">
                                                  <div className="custom-control custom-checkbox small">
                                                      {/* <input type="checkbox" className="custom-control-input" id="customCheck">
                                                      <label className="custom-control-label" for="customCheck">Remember
                                                          Me</label> */}
                                                  </div>
                                              </div>
                                                <SubmitBtn text="Login" disable={this.state.buttonDisabled} onClick={ () => this.doLogin} />
                                              <hr />
                                              <a href="index.html" className="btn btn-google btn-user btn-block">
                                                  <i className="fab fa-google fa-fw"></i> Login with Google
                                              </a>
                                              <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                  <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                              </a>
                                          </form>
                                          <hr />
                                          <div className="text-center">
                                              <a className="small" href="forgot-password.html">Forgot Password?</a>
                                          </div>
                                          <div className="text-center">
                                              <a className="small" href="register.html">Create an Account!</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div> 

        )  
    };  
}
  
  export default LoginForm;
  