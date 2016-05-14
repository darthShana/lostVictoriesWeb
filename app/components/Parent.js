var React = require('react');
var GamesPanel = require('./GamesPanel');
var LoginModalLink = require('./LoginModalLink');
var LoginCreateUser = require('./LoginCreateUser');

var Parent = React.createClass({

  render: function(){
    return (
      <div>
        <LoginModalLink modelTtile="Login / Register">
          <LoginCreateUser />
        </LoginModalLink>

        <GamesPanel />
        <div> This is the parent .. 46 </div>
      </div>
    )
  }
});

module.exports = Parent;
