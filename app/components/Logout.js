var React = require('react');
var ErrorPanel = require('./ErrorPanel');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Logout = React.createClass({

    getInitialState : function() {
        return {
            errorMessages: []
        };
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

    render: function() {
        return (
          <div>
            {/*<ErrorPanel messsages={this.state.errorMessages}/>*/}
            {/*{panel}*/}
            <a onClick={this.handleLogout}>Logout</a>
          </div>
        )
    },

});

module.exports = Logout;
