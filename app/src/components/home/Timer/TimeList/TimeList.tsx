import * as React from 'react';
import TimeItem from '../TimeItem/TimeItem';

export default class TimeList extends React.Component<any, any> {
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
			let dragBy = state.dragBy + (ev.screenX - state.lastDragX);
			const itemWidth = window.innerWidth;
			const minutes = this.props.minutes;
			const incr = dragBy < 0 ? 1 : -1;
			const initialPos = this.state.initialPos;

			if (Math.abs(dragBy) > Math.abs(initialPos) * 2) {
				dragBy = this.state.initialPos;
				this.props.setMinutes(() => incr);
			}

			this.setState({
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