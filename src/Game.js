export const DIMENSION = 7;

const initGameState = {
	positions: {
		p1: [-1, -1],
		p2: [-1, -1]
	},
	currentTurn: 'p1',
	usedSquares: zeros([DIMENSION, DIMENSION]),
	winner: ''
}

let gameState = JSON.parse(JSON.stringify(initGameState));

function zeros(dimensions) {
	var array = [];

	for (var i = 0; i < dimensions[0]; ++i) {
			array.push(dimensions.length === 1 ? 0 : zeros(dimensions.slice(1)));
	}

	return array;
}

function moveIsLegal(x, y) {
	const { p1, p2 } = gameState.positions;

	if (x < 0 || x >= DIMENSION) {
		return false;
	}

	if (y < 0 || y >= DIMENSION) {
		return false;
	}

	if (gameState.usedSquares[x][y] === 1) {
		return false;
	}

	if ((x === p1[0] && y === p1[1]) ||
			(x === p2[0] && y === p2[1])) {
				return false;
	}

	return true;
}

function getLegalMoves(x, y) {
	const directions = [
		[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]
	];

	return directions
		.map(d => [d[0] + x, d[1] + y])
		.filter(m => moveIsLegal(m[0], m[1]));
}

function checkWinner() {
	const { positions, currentTurn } = gameState;
	if (getLegalMoves(...positions[currentTurn]).length === 0) {
		if (currentTurn === 'p1') return 'p2';
		return 'p1';
	}

	return null;
}

let observer = null;

function emitChange() {
	observer(gameState);
}

export function resetGameState() {
	gameState = JSON.parse(JSON.stringify(initGameState));
	emitChange();
}

export function getPlayerName(player) {
	if (player === 'p1') {
		return 'Player 1';
	}

	return 'Player 2';
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = o;
	emitChange();

	return () => {
		observer = null;
	};
}

export function canMoveKnight(toX, toY) {
	const [x, y] = gameState.positions[gameState.currentTurn];
	const dx = toX - x;
	const dy = toY - y;

	if (!moveIsLegal(toX, toY)) {
		return false;
	}

	return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
				(Math.abs(dx) === 1 && Math.abs(dy) === 2);
}

export function moveKnight(toX, toY) {
	gameState.positions[gameState.currentTurn] = [toX, toY];
	gameState.usedSquares[toX][toY] = 1;
	if (gameState.currentTurn === 'p1') {
		gameState.currentTurn = 'p2';
	} else {
		gameState.currentTurn = 'p1';
	}

	const winner = checkWinner();

	if (winner !== null) {
		gameState.winner = winner;
	}

	emitChange();
}
