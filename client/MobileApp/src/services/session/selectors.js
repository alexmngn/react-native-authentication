import store from 'MobileApp/src/store';

export const get = () => store.getState().services.session;
