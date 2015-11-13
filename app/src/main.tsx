import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TopElement from './components/home/main';

interface IMainProps {}
interface IMainState {}
interface IMain extends JSX.ElementClass {}

class Main extends React.Component<IMainProps, IMainState> {
	render(): JSX.Element {
		return (
			<TopElement />
		);
	}
}

ReactDOM.render(React.createElement(Main), document.getElementById('mountNode'));
