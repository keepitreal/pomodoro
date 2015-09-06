import * as React from 'react';
import Timer from './Timer/TimeList/TimeList';

export interface IAppState {
	minutes: Array<number>;
}

export default class Home extends React.Component<any, IAppState> {
	state = {
		minutes: [],
		numMinutes: 27
	}

	generateMinutes(minuteLimit: number = 60) {
		let minutes = [];

		for (let i = 0; i < minuteLimit; i++) {
			minutes.push(i);
		}

		return minutes;
	}

	componentWillMount() {
		this.setState({
			minutes: this.generateMinutes()
		});
	}

	render() {
		const state = this.state;

		return (
			<Timer
				minutes={this.sliceArray(state.minutes, 0, state.numMinutes)}
				setMinutes={(cb) => this.setMinutes(cb)} />
		);
	}

	setMinutes(cb: Function => number) {
		const state = this.state;
		const minutes = state.minutes;

		this.setState({
			minutes: this.sliceArray(minutes, minutes[0] + cb(), state.numMinutes)
		});
	}

	sliceArray(arr: Array<number>, start: number, dist: number): Array<number> {
		const length = arr.length;
		const begin = this.getIndexes(start, length);
		const end = this.getIndexes(start + dist, length);

		if (begin < end) {
			return arr.slice(begin, end);
		}

		return [].concat(arr.slice(begin, arr.length), arr.slice(0, end));
	}

	getIndexes(start: number, length: number): number {
		const trips = Math.floor(Math.abs(start) / length)
		const dist = Math.abs(start) - (trips * length);
		let index = dist;

		if (start < 0) {
			index = length - dist;
		}

		return index;
	}
}