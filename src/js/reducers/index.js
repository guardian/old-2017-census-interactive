import { combineReducers } from 'redux'
import { FETCH_COMMENTS, SELECT_AREA, REQUEST_DATA, RECEIVE_DATA, ERROR_DATA } from '../actions'

function fetchedComments(state = [], action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return action.comments
		default:
			return state
	}
}

function selectedArea(state = {id: 0, name: ''}, action) {
	switch (action.type) {
		case SELECT_AREA:
			return Object.assign({}, state, {
				id: action.id,
				name: action.name
			})
		default:
			return state
	}
}

function data(state = {isFetching: false, data: {}}, action) {
	switch (action.type) {
		case REQUEST_DATA:
			return Object.assign({}, state, {
				isFetching: true,
				isError: true
			})
		case RECEIVE_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				isError: false,
				data: action.data,
				lastUpdated: action.receivedAt
			})
		case ERROR_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				isError: true
			})
		default:
			return state
	}
}

function dataByArea(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DATA:
		case REQUEST_DATA:
		case ERROR_DATA:
			return Object.assign({}, state, {
				[action.id]: data(state[action.id], action)
			})
		default:
			return state
	}
}

const rootReducer = combineReducers({
	dataByArea,
	selectedArea,
	fetchedComments
})

export default rootReducer