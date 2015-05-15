let React = require('react');
let d3 = require('d3');

let TooltipMixin = {
	propTypes: {
		tooltipHtml: React.PropTypes.func
	},

	getInitialState() {
		return {
			tooltip: {
				hidden: true,
				fixed: true
			}
		};
	},

	getDefaultProps() {
		return {
			tooltipOffset: {top: 0, left: 20},
			tooltipHtml: null
		};
	},

	componentDidMount() {
		this._svg_node = this.getDOMNode().getElementsByTagName("svg")[0];
	},

	onMouseEnter(e, data, gsize ) {

		console.log( "Enter" );

		if (!this.props.tooltipHtml) {
			return;
		}

		let {margin, tooltipHtml} = this.props;

		let svg = this._svg_node;
		let position;

		if (  this.state.tooltip.fixed ){
			position = [0, 0];
		}
		else {
			if (svg.createSVGPoint) {
				var point = svg.createSVGPoint();
				point.x = e.clientX, point.y = e.clientY;
				point = point.matrixTransform(svg.getScreenCTM().inverse());
				position = [point.x - margin.left, point.y - margin.top];
			} else {
				let rect = svg.getBoundingClientRect();
				position = [e.clientX - rect.left - svg.clientLeft - margin.left,
							e.clientY - rect.top - svg.clientTop - margin.top];
			}
		}
 		
 		let top = 0;
 		let left = 0;

 		if ( this.state.tooltip.fixed ){
			top = (gsize.height / 2) + this.props.tooltipOffset.top,
 			left = ( gsize.width) - this.props.tooltipOffset.left;
 		}
 		else {
 			top = e.clientY + this.props.tooltipOffset.top,
 			left = e.clientX + this.props.tooltipOffset.left
 		}

		this.setState({
			tooltip: {
				top: top + 10,
				left: left,
				hidden: false,
				fixed: true,
				html: tooltipHtml(data, position)
			}
		});
	},

	onMouseLeave(e) {

		console.log( "out" );

		if (!this.props.tooltipHtml) {
			return;
		}

		this.setState({
			tooltip: {
				hidden: true,
				fixed: true
			}
		});
	}
};

module.exports = TooltipMixin;
