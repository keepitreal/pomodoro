import * as React from 'react';
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

React.render(React.createElement(Main), document.body);
