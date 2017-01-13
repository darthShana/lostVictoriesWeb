var Flux = new McFly();
var React = require('react');
var ReactDOM = require('react-dom');
var Loader = require('react-loader');
var UserActions = require('../actions/UserActions');
var CommentStore = require('../stores/CommentStore');
var UserStore = require('../stores/UserStore');
var CommentsBox = require('./CommentsBox');
var LoginCreateUser = require('./LoginCreateUser');
var Logout = require('./Logout');

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
            <div className="section_under_header col-sm-12">
                <div className="col-xs-12 col-sm-12 left_section">
                    <p id="welcome-user">Welcome, {UserStore.getUser().username}</p>
                </div>
            </div>
          {/*<h3>Games</h3>*/}
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
        // var panel = UserStore.userSelected() ? this.renderPanel() : LoginCreateUser.render();
        if(UserStore.userSelected()) {
            ReactDOM.render(<Logout />, document.getElementById('login-logout-section'));
            return (
                <div>
                    <Loader loaded={!CommentStore.waitingForGame()}/>
                    { this.renderPanel() }
                </div>
            );
        }
        return ( <LoginCreateUser /> )
    }
});

module.exports = GamesPanel;
