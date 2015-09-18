import BaseActions from './BaseActions';
import Dispatcher from '../utils/Dispatcher';
import Constants from '../constants/TimerConstants';

class TimerActions extends BaseActions {
	constructor() {
		super(Constants);
	}

	updateMinutes(incr: number): void {
		Dispatcher.handleAction(this.constants.TIMER_UPDATE_MINUTES, incr);
	}
}

export default new TimerActions();