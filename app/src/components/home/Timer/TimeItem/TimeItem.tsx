import * as React from 'react';

export default class TimeItem extends React.Component<any, any> {
	render() {
		const width: any = {
			width: (100 / this.props.numMinutes) + '%'
		};

		return (
			<li className="TimeItem" style={width}>
				{function() {
					if (this.props.minute % 5 === 0) {
						return <span>{this.props.minute}</span>;
					}
				}.call(this)}
			</li>
		);
	}
}
