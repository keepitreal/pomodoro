import BaseStore from './BaseStore';
import TimerStore from '../constants/TimerConstants';
import {default as dispatcher, IDispatchPayload} from '../utils/Dispatcher';

class TimerStoreStatic extends BaseStore {
	numVisibleMinutes: number = 31;
	minutes: Array<number> = this.utils.createOrderedArray(0, 59);
	visibleMinutes: Array<number> = this.utils.sliceEndlessArray(this.minutes, 45, this.numVisibleMinutes);

	setVisibleMinutes(incr: number): void {
		this.visibleMinutes = this.utils.sliceEndlessArray(this.minutes, this.visibleMinutes[0] + incr, this.numVisibleMinutes);
	}

	getVisibleMinutes(): Array<number> {
		return this.visibleMinutes;
	}
}

let timerStore = new TimerStoreStatic();
export default timerStore;

dispatcher.register((action: IDispatchPayload) => {
	let incr: number = null;

	switch (action.actionType) {
		case TimerStore.TIMER_UPDATE_MINUTES:
			incr = action.payload;
			timerStore.setVisibleMinutes(incr);
		default:
			// noop
	}

	timerStore.emitChange();
});
