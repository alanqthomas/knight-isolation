import React, { Component } from 'react';
import Board from './Board';
import { observe, resetGameState, getPlayerName } from './Game';

class App extends Component {
	constructor(props) {
		super(props);
		this.unobserve = observe(this.handleChange.bind(this));
	}

	handleChange(gameState) {
		const { positions, currentTurn, usedSquares, winner } = gameState;
		const nextState = { positions, currentTurn, usedSquares, winner };
		if (this.state) {
			this.setState(nextState);
		} else {
			this.state = nextState;
		}
	}

	componentWillUnmount() {
		this.unobserve();
	}

	render() {
		const { positions, currentTurn, usedSquares, winner } = this.state;
		return (
			<div style={{
				textAlign: 'center'
			}}>
				<h1>Knight Isolation</h1>
				<div
					style={{
						margin: 'auto',
						width: 500,
						height: 500,
						border: '1px solid gray',
					}}
				>
					<Board
						positions={positions}
						currentTurn={currentTurn}
						usedSquares={usedSquares}
						winner={winner}
					/>
				</div>
				<div>
					<h4>Current Turn: {getPlayerName(currentTurn)}</h4>
				</div>
				<div>
					{winner && <h2>Winner: {getPlayerName(winner)}</h2>}
				</div>
				<div>
					<button onClick={() => resetGameState()}>Reset Game</button>
				</div>
			</div>
		);
	}
}

export default App;
