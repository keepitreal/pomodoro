import * as React from 'react';
import TimeItem from '../TimeItem/TimeItem';

export default class TimeList extends React.Component<any, any> {
	state = {
		isDragging: false,
		lastDragX: null,
		lastDragIncr: 0,
		dragBy: null,
		minutes: [],
		minuteWidth: null,
	};

	componentWillMount() {
		this.setState({
			minutes: this.props.minutes,
			minuteWidth: window.innerWidth / (this.props.minutes.length - 2)
		});
	}

	startDrag(ev) {
		this.setState({
			lastDragX: ev.screenX,
			isDragging: true
		});
	}

	monitorDrag(ev) {
		const state = this.state;

		if (state.isDragging) {
			const dragBy = state.dragBy + (ev.screenX - state.lastDragX);
			const lastDragIncr = state.lastDragIncr;
			const itemWidth = window.innerWidth;
			const minutes = this.state.minutes;
			const incr = dragBy < 0 ? -1 : 1;

			if (Math.abs(dragBy) - this.state.minuteWidth < 1) {
				this.props.setMinutes(() => incr);
			}

			this.setState({
				lastDragIncr: lastDragIncr,
				dragBy: dragBy,
				lastDragX: ev.screenX
			});
		}
	}

	endDrag(ev) {
		this.setState({
			isDragging: false
		});
	}

	render() {
		const itemWidth = -this.state.minuteWidth;
		const transform = { left: this.state.dragBy + itemWidth || itemWidth };
		const TimeItems = this.state.minutes.map((minute)=> {
			return (
				<TimeItem minute={minute} key={minute} numMinutes={this.state.minutes.length - 2} />
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