var React = require('react');
var CommentStore = require('../stores/CommentStore');
var UserStore = require('../stores/UserStore');
var CommentActions = require('../actions/CommentActions');
var Game = require('./Game');
var CreateGamePanel = require('./CreateGamePanel');


var CommentsBox = React.createClass({
    componentDidMount: function() {
      this.pollForGames();
      this._timer = setInterval(this.pollForGames, 5000);
    },
    pollForGames: function() {
      $.ajax({
        url: domain+"/authenticated/games?userID="+UserStore.getUser().id,
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials:true },
        success: function(data) {
            syncGamesWithStore(data);
        },
      })

    },
    render : function(){
        return (
            <div>
                <div className="table-responsive ongoing">
                    <table className="table games-table" id="ongoing-table">
                        <thead>
                        <tr>
                            <th>Games</th>
                            <th>Started on</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.comments.map(function(game, index){
                                return <Game index={index} game={game} table="ongoing" />
                            })}
                        </tbody>
                    </table>
                </div>

                <CreateGamePanel games={this.props.comments}/>
            </div>
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

module.exports = CommentsBox;
