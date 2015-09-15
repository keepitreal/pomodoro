import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher<IDispatchPayload> {
	handleAction(action, response) {
		this.dispatch({
			source: 'VIEW_ACTION',
			actionType: action,
			payload: response
		});
	}
}

export interface IDispatchPayload {
	source: string;
	actionType: string;
	payload: any;
}

let dispatcher = new AppDispatcher();
export default dispatcher;
