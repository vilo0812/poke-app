import React from 'react';
import './index.css';
import App from './App.jsx';

import {Provider} from 'react-redux'
import generateStore from './ducks/store'
const store = generateStore();
const Firebase = () => {
	return(
		<Provider store={store}>
	      <App />
	    </Provider>
	);
}
export default Firebase;