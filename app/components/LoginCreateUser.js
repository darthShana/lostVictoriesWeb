var React = require('react');
var Recaptcha = require('react-gcaptcha');
var ErrorPanel = require('./ErrorPanel');
var UserActions = require('../actions/UserActions');
var recaptchaResponse = '';
var UserStore = require('../stores/UserStore');
var ReactDOM  = require('react-dom');

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
            UserActions.setUser(data)
            UserStore.setUser(data);
            // console.log(data);
            // console.log(UserStore.userSelected());
            // window.location.reload(true);
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
            $('#login-logout-section').html('<a href="#">Login</a>');
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
        <div className="auth-container">
            <div>
                <h3>REGISTER</h3>
                <label>Username</label><input type="text" ref="username"/><br/>
                <label>Email</label><input type="text" ref="email"/><br/>
                <label>Password</label><input type="password" ref="password1"/><br/>
                <label>Repeat Password</label><input type="password" ref="password2"/><br/>
                <Recaptcha sitekey='6LeQ0xUTAAAAAE09a_8Aoqvmnn2_r3tmtRAxd6vL' onloadCallback={loaded} verifyCallback={callback} />
                <div ref="recaptchaTarget"></div>
                <br/><br/>
                <button onClick={this.handleAddUser} className="submit-button">Register</button>
                <br/><br/>
                <button onClick={this.handleToggle} className="join-us">Continue as existing User</button>
            </div>
        </div>
      )
    },
    renderLogin: function() {
      return (
          <div className="auth-container">
              <div>
                  <h3>LOGIN</h3>
                  <label>Username</label><input type="text" ref="username"/><br/>
                  <label>Password</label><input type="password" ref="password"/><br/>
                  <a href="#">Recover password</a>
                  <br/><br/>
                  <button onClick={this.handleLogin} className="submit-button">Sign In</button><br/><br/><br/>
                  <span>New on Lost Victories?</span><button onClick={this.handleToggle} className="join-us">Join Us Now</button>
              </div>
        </div>
      )
    },
    render: function() {
      var panel = this.state.createUserIsOpen ? this.renderCreateUser() : this.renderLogin();
      return (
          <div>{panel}</div>
      )
      // return (
      //   <div>
      //     <ErrorPanel messsages={this.state.errorMessages}/>
      //     {panel}
      //     <button onClick={this.handleLogout}>Logout</button>
      //   </div>
      // )
    },

});

module.exports = LoginCreateUser;
