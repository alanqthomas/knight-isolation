import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
	static propTypes = {
		black: PropTypes.bool,
		children: PropTypes.node,
	};

	render() {
		const { black } = this.props;
		const backgroundColor = black ? '#769656' : '#EEEED2';

		return (
			<div
				style={{
					color: 'lightgray',
					backgroundColor,
					textAlign: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				{this.props.children}
			</div>
		);
	}
}