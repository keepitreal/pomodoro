import BaseStore from './BaseStore';
import TimerStore from '../constants/TimerConstants';
import {default as dispatcher, IDispatchPayload} from '../utils/Dispatcher';

class TimerStoreStatic extends BaseStore {
	private _milliseconds: number = 0;
	private _numVisibleMinutes: number = 31;
	private _minutes: Array<number> = this.utils.createOrderedArray(0, 59);
	private _visibleMinutes: Array<number> = this.utils.sliceEndlessArray(this._minutes, 45, this._numVisibleMinutes);

	set visibleMinutes(minutes: Array<number>) {
		this._visibleMinutes = minutes;
	}

	get visibleMinutes(): Array<number> {
		return this._visibleMinutes;
	}

	public shiftMinutes(incr: number) {
		this.visibleMinutes = this.utils.sliceEndlessArray(this._minutes, this._visibleMinutes[0] + incr, this._numVisibleMinutes);
	}

	set milliseconds(ms: number) {
		this._milliseconds =  ms;
	}

	get milliseconds(): number {
		return this._milliseconds;
	}

	public setMilliseconds(seconds: number) {
		const middleIndex = Math.floor(this._visibleMinutes.length / 2);
		const minute = this._visibleMinutes[middleIndex];

		this.milliseconds = (minute * 1000 * 60) + Math.floor(seconds * 1000);
	}
}

let timerStore = new TimerStoreStatic();
export default timerStore;

(<any>dispatcher).register((action: IDispatchPayload) => {
	let incr: number = null;
	let seconds: number = null;

	console.log(action.actionType);

	switch (action.actionType) {
		case TimerStore.TIMER_UPDATE_MINUTES:
			incr = action.payload;
			timerStore.shiftMinutes(incr);
			break;
		case TimerStore.TIMER_SET:
			seconds = action.payload * 60;
			timerStore.setMilliseconds(seconds);
			break;
		case TimerStore.TIMER_PAUSE:
			break;
		default:
			// noop
	}

	timerStore.emitChange();
});
