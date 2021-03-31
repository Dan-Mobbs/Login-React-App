import React from 'react';
import { observer } from 'mobx-react';
import Userstore from './Stores/Userstore.js';
import LoginForm from './Components/LoginForm.js';
import SubmitBtn from './Components/SubmitBtn.js';
import './App.css';

class App extends React.Component {

  async componentDidMount() {

    try {

        let res = await fetch('/isLogginIn', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });

        let result = await res.json();

        if (result && result.success) {
          Userstore.loading = false;
          Userstore.isLoggedIn = true;
          Userstore.userName = result.userName;
        } else {
          Userstore.loading = false;
          Userstore.isLoggedIn = false;
        }
    }

    catch(e) {
      Userstore.loading = false;
      Userstore.isLoggedIn = false;
    }
  }

  async doLogOut() {

    try {

        let res = await fetch('/logout', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });

        let result = await res.json();

        if (result && result.success) {          
          Userstore.isLoggedIn = true;
          Userstore.userName = '';
        } 
    }

    catch(e) {
      console.log(e);
    }
  }  

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-primary');
    }   
        
  render() {

      if (Userstore.loading) {
        return (
          <div className="app">
            <div className='container'>
              Loading, please wait...
            </div>
          </div>  
        )
      }

      else {
        if (Userstore.isLoggedIn) {
          return (
            <div className="app">
              <div className='container'>
                Welcome {Userstore.userName}

                <SubmitBtn
                  text={ 'Log Out' }
                  disabled={ false }
                  onClick={ () => this.doLogOut() }
                />

              </div>
            </div>  
          );
        }    

      return (
        <div className="app">
          <div className="container">          
            <LoginForm />  
          </div>  
        </div>
      );  

    }

  }  

}

export default observer(App);
