import * as React from 'react';
import Timer from './Timer/TimeList/TimeList';

export interface IHomeState {
	minutes: Array<number>;
	numMinutes: number;
	minuteStart: number;
	numHiddenMinutes: number;
}

export interface IHomeProps {}

export default class Home extends React.Component<IHomeProps, IHomeProps> {
	state: IHomeState = {
		minutes: [],
		numMinutes: 29,
		minuteStart: 46,
		numHiddenMinutes: 4
	}

	props: IHomeProps = {}

	generateMinutes(minuteLimit: number = 60): Array<number> {
		let minutes = [];

		for (let i = 0; i < minuteLimit; i++) {
			minutes.push(i);
		}

		return minutes;
	}

	componentWillMount() {
		this.setState({
			minutes: this.generateMinutes()
		} as any);
	}

	render(): JSX.Element {
		const state = this.state;

		return (
			<div>
				<Timer
					minutes={this.sliceArray(state.minutes, state.minuteStart, state.numMinutes)}
					numHiddenMinutes={this.state.numHiddenMinutes}
					setMinutes={(cb) => this.setMinutes(cb)}
					getMilliseconds={(cb) => {this.getMilliseconds(cb)}} />
				<span className="pointer" />
			</div>
		);
	}

	setMinutes(cb: () => number): void {
		const state = this.state;
		const minutes = state.minutes;

		this.setState({
			minuteStart: state.minuteStart + cb()
		} as any);
	}

	getMilliseconds(cb: () => number): void {
		console.log(cb());
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
