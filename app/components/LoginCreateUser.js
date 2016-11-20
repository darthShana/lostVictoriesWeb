var React = require('react');
var Recaptcha = require('react-gcaptcha');
var ErrorPanel = require('./ErrorPanel');
var UserActions = require('../actions/UserActions');
var recaptchaResponse = '';

var callback = function (key) {
  recaptchaResponse = key;
};
var loaded = function () {
  console.log('recaptchaLoaded');
};

var LoginCreateUser = React.createClass({

    getInitialState : function() {
      return {
        createUserIsOpen : false,
        errorMessages: []
      };
    },
    handleToggle : function() {
      this.setState({
        createUserIsOpen : !this.state.createUserIsOpen
      });
    },
    componentDidMount : function(){
      if(this.state.createUserIsOpen){
        Recaptcha.render(this.refs.recaptchaTarget, {sitekey: '6LeQ0xUTAAAAAE09a_8Aoqvmnn2_r3tmtRAxd6vL'})
      }
    },

    handleAddUser : function() {
      var data = {
        username: this.refs.username.value,
        email: this.refs.email.value,
        password1: this.refs.password1.value,
        password2: this.refs.password2.value,
        recaptchaResponse: recaptchaResponse
      };

      $.ajax({
        url: domain+"/createUser",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        xhrFields: { withCredentials:true },
        success: function(data) {
            console.log('success');
            this.setState({
              errorMessages: []
            });
            UserActions.setUser(data);
        }.bind(this),
        error: function(data) {
            console.log('error', data);
            this.setState({
              errorMessages: [data.responseJSON.message]
            });
        }.bind(this)
      })

    },
    handleLogin : function() {
      var data = {
        username: this.refs.username.value,
        password1: this.refs.password.value
      };

      $.ajax({
        url: domain+"/userLogin",
        type: "POST",
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        xhrFields: { withCredentials:true },
        success: function(data) {
            console.log('success');
            this.setState({
              errorMessages: []
            });
            UserActions.setUser(data);
        }.bind(this),
        error: function(data) {
            console.log('error', data);
            this.setState({
              errorMessages: [data.responseJSON.message]
            });
        }.bind(this)
      })

    },

    handleLogout : function() {
      $.ajax({
        url: domain+"/authenticated/userLogout",
        type: "POST",
        data: JSON.stringify({stuff:'tests'}),
        contentType:"application/json; charset=utf-8",
        xhrFields: { withCredentials:true },
        success: function(data) {
            console.log('success');
            this.setState({
              errorMessages: []
            });
            UserActions.clearUser();
        }.bind(this),
        error: function(data) {
            console.log('error', data);
            this.setState({
              errorMessages: [data.responseJSON.message]
            });
        }.bind(this)
      })

    },

    renderCreateUser: function() {
      return (
        <div>
          username: <input type="text" ref="username"/>
          email: <input type="text" ref="email"/>
          password: <input type="password" ref="password1"/>
          repeat password: <input type="password" ref="password2"/>
          <Recaptcha sitekey='6LeQ0xUTAAAAAE09a_8Aoqvmnn2_r3tmtRAxd6vL' onloadCallback={loaded} verifyCallback={callback} />
          <div ref="recaptchaTarget"></div>
          <button onClick={this.handleAddUser}>Register</button>
          <button onClick={this.handleToggle}>Continue as existing User</button>
        </div>
      )
    },
    renderLogin: function() {
      return (
        <div>
          username: <input type="text" ref="username"/>
          password: <input type="password" ref="password"/>
          <button onClick={this.handleLogin}>Login</button>
          <button onClick={this.handleToggle}>Create new user</button>
        </div>
      )
    },
    render: function() {
      var panel = this.state.createUserIsOpen ? this.renderCreateUser() : this.renderLogin();

      return (
        <div>
          <ErrorPanel messsages={this.state.errorMessages}/>
          {panel}
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      )
    }
});

module.exports = LoginCreateUser;
