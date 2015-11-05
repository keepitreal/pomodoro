import * as React from 'react';
import TimeItem from '../TimeItem/TimeItem';
import TimerActions from '../../../../actions/TimerActions';
import TimerStore from '../../../../stores/TimerStore';

interface ITimeListState {
	isDragging: boolean;
	lastDragX: number;
	dragBy: number;
	minuteWidth: number;
	initialPos: number;
}

interface ITimeListProps {
	minutes: Array<number>;
	numHiddenMinutes: number;
}

export default class TimeList extends React.Component<ITimeListProps, ITimeListState> {
	state = {
		isDragging: false,
		lastDragX: null,
		dragBy: null,
		minuteWidth: null,
		initialPos: 0
	};

	/// LifeCycle Methods

	componentWillMount() {
		const minuteWidth = window.innerWidth / (this.props.minutes.length - this.props.numHiddenMinutes);
		const initialPos = -(minuteWidth * (this.props.numHiddenMinutes / 4));

		this.setState({
			minutes: this.props.minutes,
			minuteWidth: minuteWidth,
			dragBy: initialPos,
			initialPos: initialPos
		} as any);
	}

	render() {
		const itemWidth = -this.state.minuteWidth;
		const leftPos = this.state.dragBy ? this.state.dragBy + itemWidth : this.state.dragBy;
		const transform: any = { left: leftPos };
		const TimeItems = this.props.minutes.map((minute)=> {
			return (
				<TimeItem
					minute={minute}
					key={minute}
					numMinutes={this.props.minutes.length - this.props.numHiddenMinutes} />
			);
		});

		return (
			<ul className="TimeList"
				style={transform}
				onMouseDown={this.startDrag.bind(this)}
				onMouseMove={this.monitorDrag.bind(this)}
				onMouseUp={this.endDrag.bind(this)}>{ TimeItems }</ul>
		);
	}

	/// Template Methods

	startDrag(ev) {
		this.setState({
			lastDragX: ev.screenX,
			isDragging: true
		} as any);

		TimerActions.pauseTimer();
	}

	monitorDrag(ev: MouseEvent) {
		const state = this.state;

		if (state.isDragging) {
			this.moveTimer(ev.screenX)
		}
	}

	endDrag(ev: MouseEvent) {
		this.setState({
			isDragging: false
		} as any);

		TimerActions.setTimer((Math.abs(this.state.dragBy) - this.state.minuteWidth) / this.state.minuteWidth);
	}

	/// Helper Methods

	moveTimer(xPos: number): void {
		let state = this.state;
		let dragBy = state.dragBy + (xPos - state.lastDragX);
		const itemWidth = window.innerWidth;
		const minutes = this.props.minutes;
		const initialPos = this.state.initialPos;
		const incr = dragBy < initialPos ? 1 : -1;

		if (dragBy < initialPos * 2 || dragBy > 0) {
			dragBy = this.state.initialPos;
			TimerActions.updateMinutes(incr);
		}

		this.setState({
			dragBy: dragBy,
			lastDragX: xPos
		} as any);
	}
}