import * as React from 'react';
import TimeItem from '../TimeItem/TimeItem';

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
	setMinutes: Function;
	getMilliseconds: (Function) => void;
}

export default class TimeList extends React.Component<ITimeListProps, ITimeListState> {
	state = {
		isDragging: false,
		lastDragX: null,
		dragBy: null,
		minuteWidth: null,
		initialPos: 0
	};

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

	startDrag(ev) {
		this.setState({
			lastDragX: ev.screenX,
			isDragging: true
		} as any);
	}

	monitorDrag(ev) {
		const state = this.state;

		if (state.isDragging) {
			let dragBy = state.dragBy + (ev.screenX - state.lastDragX);
			const itemWidth = window.innerWidth;
			const minutes = this.props.minutes;
			const initialPos = this.state.initialPos;
			const incr = dragBy < initialPos ? 1 : -1;

			if (dragBy < initialPos * 2 || dragBy > 0) {
				dragBy = this.state.initialPos;
				this.props.setMinutes(() => incr);
			}

			this.setState({
				dragBy: dragBy,
				lastDragX: ev.screenX
			} as any);
		}
	}

	endDrag(ev) {
		const middleIndex = Math.floor(this.props.minutes.length / 2);
		const minute = this.props.minutes[middleIndex];
		const seconds = ((Math.abs(this.state.dragBy) - this.state.minuteWidth) / this.state.minuteWidth) * 60;

		this.setState({
			isDragging: false
		} as any);

		this.props.getMilliseconds(() => {
			return (minute * 1000 * 60) + Math.floor(seconds * 1000);
		})
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
}