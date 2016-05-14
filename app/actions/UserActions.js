var Flux = new McFly();

var UserActions = Flux.createActions({
    setUser : function(user){
      return{
        actionType: "SET_USER",
        user: user
      }
    }

});

module.exports = UserActions;
