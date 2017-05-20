import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { DIMENSION } from './Game';

class Board extends Component {
	static propTypes = {
		positions: PropTypes.objectOf(PropTypes.arrayOf(
			PropTypes.number.isRequired,
		)).isRequired,
		currentTurn: PropTypes.string,
		usedSquares: PropTypes.arrayOf(
			PropTypes.arrayOf(
				PropTypes.number.isRequired
				).isRequired
			).isRequired
	};

	renderSquare(i) {
		const x = i % DIMENSION;
		const y = Math.floor(i / DIMENSION);
		const dimPercentage = 100 / DIMENSION;
		return (
			<div key={i} style={{ width: `${dimPercentage}%`, height: `${dimPercentage}%` }}>
				<BoardSquare x={x} y={y} allowClick={!this.checkPlayersOnBoard()}>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</div>
		);
	}

	checkPlayersOnBoard() {
		const { p1: [p1X, p1Y], p2: [p2X, p2Y] } = this.props.positions;
		return [p1X, p1Y, p2X, p2Y].every(p => p >= 0);
	}

	renderPiece(x, y) {
		const { usedSquares } = this.props;
		const { p1: [p1X, p1Y], p2: [p2X, p2Y] } = this.props.positions;
		const isP1Here = x === p1X && y === p1Y;
		const isP2Here = x === p2X && y === p2Y;

		let player;

		if (isP1Here) { player = 'p1'; }
		else if (isP2Here) { player = 'p2'; }

		if (player) {
			return <Knight player={player} currentTurn={this.props.currentTurn} />;
		}

		if (usedSquares[x][y] === 1) {
			return '◉';
		}

		return null;
	}

	render() {
		const squares = [];
		for (let i = 0; i < Math.pow(DIMENSION, 2); i++) {
			squares.push(this.renderSquare(i));
		}

		return (
			<div style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexWrap: 'wrap'
			}}>
				{squares}
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Board);
