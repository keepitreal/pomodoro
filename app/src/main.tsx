import * as React from 'react';
import Home from './components/home/main';

class Main extends React.Component<any, any> {
	render() {
		return (
			<Home />
		);
	}
}

React.render(React.createElement(Main), document.body);
