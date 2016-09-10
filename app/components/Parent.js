var React = require('react');
var GamesPanel = require('./GamesPanel');
var LoginModalLink = require('./LoginModalLink');
var LoginCreateUser = require('./LoginCreateUser');

var Parent = React.createClass({

  render: function(){
    return (
      <div>
        <header class="container_12">
              <div class="grid_1"></div>
              <div class="grid_10 bold-header">
                  <h3>war extra</h3>
              </div>
              <div class="login grid_1">
                <LoginModalLink modelTtile="Login / Register">
                  <LoginCreateUser />
                </LoginModalLink>
              </div>
              <div class="grid_12 border newspaper-name">
                  <h4>The Lost Victories Examiner</h4>
              </div>
      		<div class="grid_12 border details-outter">
                  <div class="grid_6">
                      <p>Volume VXII -- NO. 190</p>
                  </div>
                  <div class="grid_6 right-align">
                      <p>March 12th, 1939</p>
                  </div>
      		</div>
              <div class="grid_12 border title">
              	<h1>Britain and France at War with Germany</h1>
      		</div>
      	</header>


        <GamesPanel />
        <div> This is the parent .. 46 </div>
      </div>
    )
  }
});

module.exports = Parent;
