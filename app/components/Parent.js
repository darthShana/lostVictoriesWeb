var React = require('react');
var GamesPanel = require('./GamesPanel');

var Parent = React.createClass({

    render: function(){
        return ( <GamesPanel /> )
    }

});

module.exports = Parent;
