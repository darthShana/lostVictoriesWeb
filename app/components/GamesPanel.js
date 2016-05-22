var Flux = new McFly();
var React = require('react');
var Loader = require('react-loader');

var CommentStore = require('../stores/CommentStore');
var UserStore = require('../stores/UserStore');
var CommentsBox = require('./CommentsBox');



function getComments(){
    return {
        comments : CommentStore.getComments()
    }
}


var GamesPanel = React.createClass({
    mixins : [CommentStore.mixin, UserStore.mixin],
    getInitialState: function(){
        return getComments();
    },
    storeDidChange: function(){
        this.setState(getComments());
    },
    renderPanel: function(){
      return (
        <div>
          Welcome {UserStore.getUser().username}
          <h3>Games</h3>
          <CommentsBox comments={this.state.comments}/>
        </div>
      );
    },
    renderBlank: function(){
      return (
        <div>
          please login to view games.
        </div>
      );
    },
    render : function(){
        var panel = UserStore.userSelected() ? this.renderPanel() : this.renderBlank();
        return (
            <div>
                <Loader loaded={!CommentStore.waitingForGame()}/>
                {panel}
            </div>
        );
    }
});

module.exports = GamesPanel;
