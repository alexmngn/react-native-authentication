import { fetchApi } from 'MobileApp/src/services/api';

const endPoints = {
	create: '/users',
	get: '/users',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'get');
