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
	}

	props: IHomeProps = {}

	private onChange() {
		this.setState({
			minutes: TimerStore.visibleMinutes
		} as any);
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
