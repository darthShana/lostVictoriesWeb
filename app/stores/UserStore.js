var Flux = new McFly();

function setUser(user){
  sessionStorage.setItem('_user', JSON.stringify(user))
}

function user(){
    var _u = sessionStorage.getItem('_user');
    if(_u!=null){
      return JSON.parse(_u);
    }
    return null;
}

var UserStore = Flux.createStore({
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


});

module.exports = UserStore;
