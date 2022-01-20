const API_URL = 'https://hst-api.wialon.com/wialon';

const API_KEY = '<your-api-key>';
const PARAMS = 'page=1';
const BASE_URL = `${API_URL}?api_key=${API_KEY}&${PARAMS}`; //move to unitConstants or userConstants or ...

export const APPSTATE_SET_RUNNING = "APPSTATE_SET_RUNNING";
export const APPSTATE_FAIL = "APPSTATE_FAIL";