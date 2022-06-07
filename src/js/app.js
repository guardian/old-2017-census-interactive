import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { selectArea, fetchDataIfNeeded } from './actions'
import rootReducer from './reducers'

import App from './containers/app'
import find from 'lodash.find'
import autocompleteData from '../data/autocomplete.json'

// Create Redux store
const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware
	)
)

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

if ( getUrlParameter('area') ){
	let id = parseInt(getUrlParameter('area'))
	let result = find(autocompleteData, ['id', id])
	
	if ( id && result ){
		store.dispatch(selectArea(id, result.label))
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('react-container')
);