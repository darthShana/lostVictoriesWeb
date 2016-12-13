var Flux = new McFly();
var React = require('react');
var Loader = require('react-loader');
var UserActions = require('../actions/UserActions');
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
    componentDidMount: function(){
      if(!UserStore.userSelected()){
        this.handleGetUser();
      }
    },

    handleGetUser: function(){
      $.ajax({
        url: domain+"/authenticated/user",
        type: "GET",
        dataType: "json",
        xhrFields: { withCredentials:true },
        success: function(data) {
            console.log('already logged in', data);
            UserActions.setUser(data);
        },
      })
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
        console.log('UserStore.userSelected()', UserStore.userSelected());
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
