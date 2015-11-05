import utils from '../utils/utils';

export interface ITimerStore {
	TIMER_UPDATE_MINUTES: string;
	TIMER_SET: string;
	TIMER_PAUSE: string;
	TIMER_TICK: string;
	TIMER_END: string;
}

const TimerStore: ITimerStore = utils.createKeyMirror('TIMER',
	'UPDATE_MINUTES',
	'SET',
	'PAUSE',
	'TICK',
	'END'
);

export default TimerStore;