import React from 'react'
import 'whatwg-fetch'
import size from 'lodash.size'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchDataIfNeeded, fetchComments } from '../../actions'
import ResultsHeader from '../../components/results/results-header.js'
import ResultsList from '../../components/results/results-list.js'
import ResultsFooter from '../../components/results/results-footer.js'
import UsersForm from '../../components/users/users-form.js'

class Results extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const { dispatch } = this.props
		dispatch(fetchComments())
	}

	componentDidMount() {
		const { dispatch, selectedArea } = this.props
		dispatch(fetchDataIfNeeded(selectedArea.id))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedArea.id !== this.props.selectedArea.id) {
			const { dispatch, selectedArea } = nextProps
			dispatch(fetchDataIfNeeded(selectedArea.id))
		}
	}

	render() {
		const { selectedArea, data, isFetching, isError, fetchedComments } = this.props
		const hasResults = size(data)
		if ( selectedArea.id !== 0 ) {
			if ( hasResults ){
				if ( !isFetching && !isError ){
					return (
						<section className="c17-results c17-results--success" id="c17-results">
							<ResultsHeader selectedArea={selectedArea.name} />
							<ResultsList data={data} fetchedComments={fetchedComments} selectedArea={selectedArea} />
							<ResultsFooter />
							<UsersForm selectedArea={selectedArea} />
						</section>
					)
				} else {
					return (
						<section className="c17-results c17-results--error text-center" id="c17-results">
							<div className="c17-loading-bar"></div>
							<h3>Unknown Error</h3>
						</section>
					)
				}
			} else {
				if ( isFetching && isError ){
					return (
						<section className="c17-results c17-results--loading text-center" id="c17-results">
							<div className="c17-loading-bar"><div></div></div>
							<h3>Loading...</h3>
						</section>
					)	
				} else if ( !isFetching && isError ){
					return (
						<section className="c17-results c17-results--error text-center" id="c17-results">
							<div className="c17-loading-bar"></div>
							<h3>Error</h3>
						</section>
					)
				} else {
					return (
						<section className="c17-results c17-results--error text-center" id="c17-results">
							<div className="c17-loading-bar"></div>
							<h3>Unknown Error</h3>
						</section>
					)
				}
			}
		} else {
			return (
				<section className="c17-results c17-results--start text-center" id="c17-results">
					<div className="c17-loading-bar"></div>
					<h3>Get started by searching above</h3>
				</section>
			)
		}
	}
}

Results.propTypes = {
	selectedArea: PropTypes.PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	fetchedComments: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	const { selectedArea, dataByArea, fetchedComments } = state
	const {
		isError,
		isFetching,
		data
	} = dataByArea[selectedArea.id] || {
		isError: false,
		isFetching: true,
		data: {}
	}

	return {
		selectedArea,
		fetchedComments,
		data,
		isFetching,
		isError
	}
}

export default connect(mapStateToProps)(Results)