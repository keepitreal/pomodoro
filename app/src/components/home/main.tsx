import * as React from 'react';
import Timer from './Timer/TimeList/TimeList';
import TimerStore from '../../stores/TimerStore';

export interface IHomeState {
	minutes: Array<number>;
	numHiddenMinutes: number;
}

export interface IHomeProps {}

export default class Home extends React.Component<IHomeProps, IHomeProps> {
	state: IHomeState = {
		minutes: [],
		numHiddenMinutes: 4
	};

	interval: NodeJS.Timer;
	timeout: any;

	props: IHomeProps = {};

	private onChange() {
		this.setState({
			minutes: TimerStore.visibleMinutes
		} as any);

		this.clearTimer();
		this.startTimer(TimerStore.milliseconds);
	}

	startTimer(ms: number): void {
		console.log(ms);
		this.interval = setInterval(() => {
			console.log('move');
		}, 200);

		this.timeout = setTimeout(() => {
			clearInterval(this.interval);
		}, ms);
	}

	clearTimer(): void {
		clearTimeout(this.timeout);
		clearInterval(this.interval);
	}

	componentWillMount() {
		this.onChange();
		TimerStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		TimerStore.removeChangeListener(this.onChange.bind(this));
	}

	render(): JSX.Element {
		const state = this.state;

		return (
			<div>
				<Timer
					minutes={this.state.minutes}
					numHiddenMinutes={this.state.numHiddenMinutes} />
				<span className="pointer" />
			</div>
		);
	}
}
