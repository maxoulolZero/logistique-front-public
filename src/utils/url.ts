// require('dotenv').config();

export function getURL() {
  if (process.env.REACT_APP_NODE_ENV === 'development') return 'http://localhost:8400/';
  else return process.env.REACT_APP_URI + '/';
}
