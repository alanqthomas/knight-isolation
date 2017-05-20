import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const knightSource = {
	beginDrag() {
		return {};
	},
	canDrag(props, monitor) {
		const { player, currentTurn } = props;
		return player === currentTurn;
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

class Knight extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		player: PropTypes.string,
		currentTurn: PropTypes.string
	};

	// ♘

	render() {
		const { connectDragSource, isDragging, player } = this.props;
		return connectDragSource(
			<div
				style={{
					fontSize: 60,
					fontWeight: 'bold',
					cursor: 'move',
					color: player === 'p1' ? 'white' : 'black',
					'textShadow': player === 'p1' ? '-1px 0 #000000,0 1px #000000,1px 0 #000000,0 -1px #000000' : 'none',
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				♘
			</div>,
		);
	}
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
