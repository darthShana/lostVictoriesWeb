var React = require('react');
var UserStore = require('../stores/UserStore');
var CommentStore = require('../stores/CommentStore');
var CommentActions = require('../actions/CommentActions');

var Game = React.createClass({
    handleJoinGame: function(country, e){
      var game = this.refs.gameObject.value;
      $.ajax({
        url: domain+"/joinGame?game="+game+"&userID="+UserStore.getUser().id+"&country="+country,
        type: "GET",
        dataType: "json",
        timeout: 2000,
        success: function(data) {
            CommentStore.clearAll();
            syncGamesWithStore(data);
        }.bind(this),
        error: function(data) {
            console.log('error');
        }.bind(this)
      })
    },
    getJoinGameControles : function(game){
      var g = JSON.stringify(game);
      return (
        <div>
          <input type="hidden" value={g} ref="gameObject"/>
          <button onClick={this.handleJoinGame.bind(g, 'AMERICAN')}>Join Game as Allied</button>
          <button onClick={this.handleJoinGame.bind(g, 'GERMAN')}>Join Game as Axis</button>
        </div>
      )
    },
    getContinueGameControles : function(game){
      var g = JSON.stringify(game);
      var gg = window.btoa(g);
      console.log('game', gg);

      g = "lostvic://lostVictoriesLauncher/game="+gg;
      return (
        <div>
          <a href={g}>Start Game</a>
        </div>
      )
    },

    render : function(){
      var button;
      if(this.props.game.gameStatus === 'inProgress'){
        if (this.props.game.joined) {
            button = this.getContinueGameControles(this.props.game);
        } else {
            button = this.getJoinGameControles(this.props.game);
        }
      }else{
        var vic = (this.props.game.victor==='AMERICAN')?(<span>alies</span>):(<span>axis</span>);
        if(this.props.game.country === this.props.game.victor){
          button = (
            <div>Congratulations!! Your war has been won by the {vic}</div>
          );
        }else{
          button = (
            <div>This war has been won by the {vic} </div>
          );
        }
      }

      return (
        <li key={this.props.index}>
          {this.props.game.name}: Started on {new Date(this.props.game.startDate).toUTCString()}
          {button}
        </li>
        );
    }
});

function syncGamesWithStore(data){

  var localIDs = CommentStore.getGameIds();
  var serverIds = [];
  for(var i = 0; i < data.length; i++) {
    var obj = data[i];
    serverIds.push(obj.id);
    if(localIDs.indexOf(obj.id) == -1){
        //console.log("adding "+obj.id);
        CommentActions.addComment(obj)
    }

  }
  for(var i = 0; i < localIDs.length; i++){
    if(serverIds.indexOf(localIDs[i]) == -1){
      //console.log("removing "+localIDs[i]);
      CommentActions.removeComment(localIDs[i]);
    }
  }

}

module.exports = Game;
