/* global fetch */

import fetchival from 'fetchival';
import _ from 'lodash';

import * as sessionSelectors from 'MobileApp/src/services/session/selectors';
import apiConfig from './config';

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	const accessToken = sessionSelectors.get().tokens.access.value;
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: _.pickBy({
			...(accessToken ? {
				Authorization: `Bearer ${accessToken}`,
			} : {
				'Client-ID': apiConfig.clientId,
			}),
			...headers,
		}, item => !_.isEmpty(item)),
	})[method.toLowerCase()](payload)
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
			});
		} else {
			throw e;
		}
	});
};
