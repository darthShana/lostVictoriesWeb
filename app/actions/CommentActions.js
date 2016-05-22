var Flux = new McFly();

var CommentActions = Flux.createActions({
    addComment : function(message){
      return{
        actionType: "ADD_COMMENT",
        message: message
      }
    },
    removeComment : function(id){
      return{
        actionType: "DELETE_COMMENT",
        id: id
      }
    },
    clearComments : function(){
        return{
            actionType: "CLEAR_COMMENTS"
        }
    },
    waitingForGame : function(gameName){
        return {
          actionType: "WAIT_FOR_GAME",
          gameName: gameName
        }
    }
});

module.exports = CommentActions;
