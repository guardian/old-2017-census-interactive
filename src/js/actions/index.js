import 'whatwg-fetch'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const SELECT_AREA = 'SELECT_AREA'
export const REQUEST_DATA = 'REQUEST_DATA'
export const ERROR_DATA = 'ERROR_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'

function areaComments(comments) {
	return {
		type: FETCH_COMMENTS,
		comments
	}
}

export function selectArea(id, name) {
	return {
		type: SELECT_AREA,
		id,
		name
	}
}

function requestData(id) {
	return {
		type: REQUEST_DATA,
		id
	}
}

function receiveData(id, json) {
	return {
		type: RECEIVE_DATA,
		id,
		data: json,
		receivedAt: Date.now()
	}
}

function errorData(id) {
	return {
		type: ERROR_DATA,
		id
	}
}

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

function fetchData(id) {
	return dispatch => {
		dispatch(requestData(id))
		return fetch('https://interactive.guim.co.uk/2017/06/aus-census-data/prod/' + id + '.json')
			.then(checkStatus)
			.then(response => response.json())
			.then(
				json => dispatch(receiveData(id, json)),
				error => {
					dispatch(errorData(id))
					console.log(error)
				})
	}
}

function fetchCommentsData() {
	return dispatch => {
		return fetch('https://interactive.guim.co.uk/docsdata/1u7wug-tZ7Td-2-rnYFgd9mdjoAGsKCYVZrelzDmFtvE.json')
			.then(checkStatus)
			.then(response => response.json())
			.then(
				json => {
					if ( json.sheets.Sheet1.length ) {
						dispatch(areaComments(json.sheets.Sheet1))
					}
				},
				error => {
					console.log(error)
				})
	}
}

function shouldFetchData(state, id) {
	if ( id > 1 ){
		const data = state.dataByArea[id]
		if (!data) {
			return true
		}
	}
	return false
}

export function fetchDataIfNeeded(id) {
	return (dispatch, getState) => {
		if (shouldFetchData(getState(), id)) {
			return dispatch(fetchData(id))
		}
	}
}

export function fetchComments() {
	return (dispatch, getState) => {
		return dispatch(fetchCommentsData())
	}
}