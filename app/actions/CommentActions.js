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
    }
});

module.exports = CommentActions;
