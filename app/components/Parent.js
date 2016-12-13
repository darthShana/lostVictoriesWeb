var React = require('react');
var GamesPanel = require('./GamesPanel');
var LoginModalLink = require('./LoginModalLink');
var LoginCreateUser = require('./LoginCreateUser');

var Parent = React.createClass({

  render: function(){
    return (
      <div>
        <header>
              <div></div>
              <div>
                  <h3>hello world</h3>
              </div>
              <div>
                <LoginModalLink modelTtile="Login / Register">
                  <LoginCreateUser />
                </LoginModalLink>
              </div>
      	</header>


        <GamesPanel />
        <div> This is the parent .. 46 </div>
      </div>
    )
  }
});

module.exports = Parent;
