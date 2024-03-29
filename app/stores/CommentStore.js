var Flux = new McFly();

var _comments = [];
var _waitingForGame = false;
var _waitingForGameName = '';

function addComment(message){
  _comments.push(message);
  if(_waitingForGame && _waitingForGameName === message.name){
    _waitingForGame = false;
    _waitingForGameName = '';
  }
}

function deleteComment(id){
  for(var i =0; i<_comments.length;i++){
    if(_comments[i].id===id){
      _comments.splice(i, 1);
    }
  }
}

function clearComments(){
    _comments = [];
}


var CommentStore = Flux.createStore({
    getComments: function(){
        return _comments;
    },
    clearAll: function(){
      clearComments();
      CommentStore.emitChange();
    },
    getGameIds: function(){
      var _ids = [];
      for(var i =0; i<_comments.length;i++){
        _ids.push(_comments[i].id);
      }
      return _ids;
    },
    waitingForGame: function(){
      return _waitingForGame;
    }
}, function(payload){
    if(payload.actionType=== "ADD_COMMENT"){
      addComment(payload.message);
      CommentStore.emitChange();
    }
    if(payload.actionType==="DELETE_COMMENT"){
      deleteComment(payload.id);
      CommentStore.emitChange();
    }
    if(payload.actionType==="CLEAR_COMMENTS"){
        clearComments();
        CommentStore.emitChange();
    }
    if(payload.actionType==="WAIT_FOR_GAME"){
      _waitingForGame = true;
      _waitingForGameName = payload.gameName;
      CommentStore.emitChange();
    }

});

module.exports = CommentStore;
