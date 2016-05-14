var React = require('react');

var ErrorPanel = React.createClass({
  render: function(){
    if(this.props.messsages && this.props.messsages.length > 0){
      return (
        <div className="alert alert-danger" role="alert">{this.props.messsages}</div>
      );
    }else{
      return (
        <div></div>
      );
    }
  }
});

module.exports = ErrorPanel;
