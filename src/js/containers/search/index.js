import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectArea } from '../../actions'
import SearchInput from '../../components/search/search-input.js'
import SearchMapIntro from '../../components/search/search-map-intro.js'
import SearchMap from '../../components/search/search-map.js'

class Search extends React.Component {
	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(id, name) {
		this.props.dispatch(selectArea(id, name))
	}

	isTouch() {
		const hasTouch = (('ontouchstart' in window) || ('ontouchstart' in document.documentElement) || (navigator.MaxTouchPoints>0)|| (navigator.msMaxTouchPoints>0))? 1:0;
		return hasTouch ? true : false
	}

	viewWidth() {
		if (self.innerWidth) {
			return self.innerWidth
		} else if (document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth
		} else if (document.body) {
			return document.body.clientWidth
		}
	}

	isApp() {
		return location.href.indexOf('http') !== 0 ? true : false;
	}

	render() {
		const { selectedArea } = this.props
		const isMobile = this.viewWidth() <= 980 || this.isTouch() ? true : false;
		const isApp = this.isApp()

		if ( !isMobile && !isApp ){
			return (
				<section className="c17-search" id="c17-search">
					<div className="c17-container c17-bg-grey">
						<div className="c17-container-inner">
							<SearchInput handleChange={this.handleChange} selectedArea={selectedArea} />
							<SearchMapIntro />
						</div>
					</div>
					<SearchMap handleChange={this.handleChange} selectedArea={selectedArea} />
				</section>
			)
		} else {
			return (
				<section className="c17-search" id="c17-search">
					<div className="c17-container c17-bg-grey">
						<div className="c17-container-inner">
							<SearchInput handleChange={this.handleChange} selectedArea={selectedArea} />
						</div>
					</div>
				</section>
			)
		}
	}
}

Search.propTypes = {
	selectedArea: PropTypes.PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedArea } = state

	return {
		selectedArea
	}
}

export default connect(mapStateToProps)(Search)