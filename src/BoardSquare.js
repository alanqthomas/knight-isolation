import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import ItemTypes from './ItemTypes';

const squareTarget = {
	canDrop(props) {
		return canMoveKnight(props.x, props.y);
	},

	drop(props) {
		moveKnight(props.x, props.y);
	},
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	};
}

class BoardSquare extends Component {
	static propTypes = {
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
		allowClick: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		children: PropTypes.node,
	};

	renderOverlay(color) {
		return (
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					zIndex: 1,
					opacity: 0.5,
					backgroundColor: color,
				}}
			/>
		);
	}

	handleClick(event) {
		event.preventDefault();
		const { x, y, allowClick } = this.props;
		if (allowClick) {
			moveKnight(x, y);
		}
	}

	render() {
		const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;
		const black = (x + y) % 2 === 1;

		return connectDropTarget(
			<div
				onClick={this.handleClick.bind(this)}
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					color: 'gray',
					fontSize: '50px'
				}}
			>
				<Square black={black}>
					{children}
				</Square>
				{isOver && !canDrop && this.renderOverlay('red')}
				{!isOver && canDrop && this.renderOverlay('yellow')}
				{isOver && canDrop && this.renderOverlay('green')}
			</div>,
		);
	}
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
