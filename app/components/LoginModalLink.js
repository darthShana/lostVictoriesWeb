var React = require('react');
var ReactLayeredComponentMixin = require('../mixins/ReactLayeredComponentMixin');
var Modal = require('../components/Modal');
var UserStore = require('../stores/UserStore.js');

var LoginModalLink = React.createClass({
    mixins: [ReactLayeredComponentMixin, UserStore.mixin],
    handleClick: function() {
        this.setState({shown: !this.state.shown});
    },
    getInitialState: function() {
        return {shown: false, ticks: 0, modalShown: false};
    },
    storeDidChange: function(){
      this.setState({
        shown : !UserStore.userSelected()
      });
    },
    componentDidMount: function() {
        setInterval(this.tick, 1000);
    },
    tick: function() {
        this.setState({ticks: this.state.ticks + 1});
    },
    renderLayer: function() {
        if (!this.state.shown) {
            return <span />;
        }
        return (
            <Modal onRequestClose={this.handleClick}>
                {this.props.children}
            </Modal>
        );
    },
    render: function() {
        return <a href="javascript:;" role="button" onClick={this.handleClick}>{this.props.modelTtile}</a>;
    }
});

module.exports = LoginModalLink;
