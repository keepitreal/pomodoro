import {isArray} from 'lodash';

export const createKeyMirror = (prefix: string = '', ...keys: Array<string>): any => {
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