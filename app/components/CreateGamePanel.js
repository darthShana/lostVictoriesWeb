var React = require('react');
var UserStore = require('../stores/UserStore');
var ErrorPanel = require('./ErrorPanel');

var CreateGamePanel = React.createClass({

  getInitialState: function(){
    return {
      errorMessages: []
    };
  },

  createNewGame: function(){
    $.ajax({
        url:domain+"/games",
        type: 'POST',
        data: JSON.stringify(UserStore.getUser()),
        Accept : "application/json",
        contentType: "application/json",
        dataType: 'json',
        mode: 'no-cors',

        success:function(res){
          console.log("sucess!!", res);
          this.setState({
            errorMessages: []
          });
        }.bind(this),
        error:function(res){
          console.log("Error! ", res);
          this.setState({
            errorMessages: [res.responseText]
          });
        }.bind(this)
    });

  },

  render: function(){
    return (
      <div>
        <ErrorPanel messsages={this.state.errorMessages}/>
        <button onClick={this.createNewGame}>Create New Game</button>
      </div>
    )
  }

});

module.exports = CreateGamePanel;
