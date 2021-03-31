import React from 'react';

class SubmitBtn extends React.Component {
    
    render() {
        return (
          <div className="SubmitBtn">
            <button
            text="Login"
             className={ "btn btn-primary btn-user btn-block" }
             disabled={ this.props.disabled }
             onClick={ () => this.props.onClick() }>
             {this.props.text}               
            </button> 
          </div>
        )  
      };
  
  }
  
  export default SubmitBtn;
  