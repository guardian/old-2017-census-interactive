import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IntroSocial from '../../components/intro/intro-social.js'

class Intro extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { selectedArea } = this.props
		
		return (
			<header className="c17-intro">
				<div className="c17-container">
					<div className="c17-container-inner">
						<h1>Census stories: how has your town or suburb changed over 10 years?</h1>
					</div>
				</div>
				<img className="c17-header-image" src="https://interactive.guim.co.uk/2017/06/aus-census-data/header-1300.jpg" srcSet="https://interactive.guim.co.uk/2017/06/aus-census-data/header-1300.jpg 1300w, https://interactive.guim.co.uk/2017/06/aus-census-data/header-1140.jpg 1140w, https://interactive.guim.co.uk/2017/06/aus-census-data/header-980.jpg 980w, https://interactive.guim.co.uk/2017/06/aus-census-data/header-740.jpg 740w, https://interactive.guim.co.uk/2017/06/aus-census-data/header-480.jpg 480w"></img>
				<div className="c17-container">	
					<div className="c17-container-inner">
						<p>Are people moving into your area or away? Is the population getting older? Has the cost of housing has gone up? Here you can see how your area has changed in key statistics from the Australian census. Then you can tell us what it feels like to live in that area, and read comments from other people who have witnessed those changes.</p>
						<p>• Support our independent journalism in Australia by giving a <a href="https://contribute.theguardian.com/uk?countryGroup=au&INTCMP=gdnwb_copts_editorial_memco_AusCensus_standfirst" target="_blank">one-off</a> or <a href="https://membership.theguardian.com/au/supporter?INTCMP=gdnwb_copts_editorial_memco_AusCensus_standfirst" target="_blank">monthly contribution</a></p>
					</div>	
				</div>
				<div className="c17-container">
					<div className="c17-container-inner">
						<IntroSocial selectedArea={selectedArea} />
					</div>
				</div>
			</header>
		)
	}
}

Intro.propTypes = {
	selectedArea: PropTypes.PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
}

function mapStateToProps(state) {
	const { selectedArea } = state
	return {
		selectedArea
	}
}

export default connect(mapStateToProps)(Intro)