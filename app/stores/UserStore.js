var Flux = new McFly();

var _user;

function setUser(user){
  _user = user;
}

function clearUser(){
  _user = null;
}

function user(){
    return _user;
}

var UserStore = Flux.createStore({
    setUser: function (user) {
      _user = user;
    },

    getUser: function(){
        return user();
    },
    userSelected: function(){
      return user() != null;
    }

}, function(payload){
    if(payload.actionType=== "SET_USER"){
      setUser(payload.user);
      UserStore.emitChange();
    }
    if(payload.actionType=== "CLEAR_USER"){
      clearUser();
      UserStore.emitChange();
    }

});

module.exports = UserStore;
