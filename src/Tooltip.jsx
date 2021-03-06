let React = require('react');
let d3 = require('d3');

let Tooltip = React.createClass({
	propTypes: {
		top: React.PropTypes.number.isRequired,
		left: React.PropTypes.number.isRequired,
		html: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.element
		])
	},

	getDefaultProps() {
		return {
			top: 0,
			left: 0,
			html: ""
		};
	},

	render() {
		let {top, left, hidden, html} = this.props;

		let style = {
			display: hidden ? "none" : "block",
			position: "absolute",
			top: top,
			left: left
		};

		return (
				<div className="tooltip" style={style}>{html}</div>
		);
	}
});

module.exports = Tooltip;
