import * as React from 'react';

export default class TimeItem extends React.Component<any, any> {
	render() {
		const width: any = {
			width: (100 / this.props.numMinutes) + '%'
		};

		return (
			<li className="TimeItem" style={width}>{this.props.minute}</li>
		);
	}
}
