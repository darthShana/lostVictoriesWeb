var React = require('react');
var _ = require('underscore');

var UserStore = require('../stores/UserStore');
var ErrorPanel = require('./ErrorPanel');
var CommentActions = require('../actions/CommentActions');

var CreateGamePanel = React.createClass({

  getInitialState: function(){
    return {
      errorMessages: []
    };
  },

  createNewGame: function(){
    $.ajax({
        url:domain+"/authenticated/games",
        type: 'POST',
        data: JSON.stringify(UserStore.getUser()),
        Accept : "application/json",
        contentType: "application/json",
        xhrFields: { withCredentials:true },

        success:function(res){
          console.log("sucess!!", res);
          CommentActions.waitingForGame(res.name);
          this.setState({
            errorMessages: []
          });
        }.bind(this),
        error:function(res){
          console.log("Error! ", res);
          this.setState({
            errorMessages: [res.responseJSON.message]
          });
        }.bind(this)
    });

  },

  render: function(){
    var available = _.filter(this.props.games, function(game) { return game.gameStatus === 'inProgress' });
    if(_.isEmpty(available)){
      return (
        <div>
          <ErrorPanel messsages={this.state.errorMessages}/>
          <button onClick={this.createNewGame} className="create-game-button">Create New Game</button>
        </div>
      );
    }else{
      return (
        <div></div>
      );
    }
  }

});

module.exports = CreateGamePanel;
