import {isArray} from 'lodash';

export default class Utils {
	static createKeyMirror(prefix: string = '', ...keys: Array<string>): any {
		if (!isArray(keys)) {
			return {};
		}

		return keys.map((value: string) => {
			value = prefix + '_' + value;
			let obj = {};
			obj[value] = value;
			return obj;
		})
	};

	static createOrderedArray(from: number, to: number): Array<number> {
		let minutes = [];

		for (let i = from; i <= to; i++) {
			minutes.push(i);
		}

		return minutes;
	}

	static sliceEndlessArray(arr: Array<number>, start: number, dist: number): Array<number> {
		const length = arr.length;
		const begin = Utils.getIndexes(start, length);
		const end = Utils.getIndexes(start + dist, length);

		if (begin < end) {
			return arr.slice(begin, end);
		}

		return [].concat(arr.slice(begin, arr.length), arr.slice(0, end));
	}

	static getIndexes(start: number, length: number): number {
		const trips = Math.floor(Math.abs(start) / length)
		const dist = Math.abs(start) - (trips * length);
		let index = dist;

		if (start < 0) {
			index = length - dist;
		}

		return index;
	}
}
