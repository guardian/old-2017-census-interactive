import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Footer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		
		return (
			<div className="c17-footer-container c17-bg-grey">
				<h2>More census coverage</h2>
				<ul className="footer-grid">
					 <li>
			            <div className="footer-item-container">
			            	<img src="https://i.guim.co.uk/img/media/05609f1e98594e08cb767586daefdffe008d30bc/0_120_3000_1800/master/3000.jpg?w=620&q=55&auto=format&usm=12&fit=max&s=87e062caef1f4e05b65bd1d6d4fe2fac"></img>
			                <div className="footer-text-content">
			                    <h2>The streets of your town – readers respond to the 2016 Australian census</h2>
			                </div>
			                <a className="anchor" href="https://www.theguardian.com/australia-news/2017/jun/28/readers-respond-2016-census-australia-demographic-change" target="_blank"></a>
			            </div>
			        </li>

			        <li>
			            <div className="footer-item-container">
			            	<img src="https://media.guim.co.uk/c6df40b706015bcb8e2557d67bd69d9d9bb03242/0_0_1000_600/1000.jpg"></img>
			                <div className="footer-text-content">
			                    <h2>Australian census map: the results, region by region</h2>
			                </div>
			                <a className="anchor" href="https://www.theguardian.com/australia-news/ng-interactive/2017/jun/27/australian-census-map-the-results-region-by-region-interactive" target="_blank"></a>
			            </div>
			        </li>

			        <li>
			            <div className="footer-item-container">
			            	<img src="https://media.guim.co.uk/d054f09b1b380be5e8584230186478a03253d4ff/0_0_1000_600/1000.jpg"></img>
			                <div className="footer-text-content">
			                    <h2>Boom and bust: five census maps that show how Australia has changed</h2>
			                </div>
			                <a className="anchor" href="https://www.theguardian.com/news/datablog/2017/jul/12/five-census-maps-show-how-australia-changed" target="_blank"></a>
			            </div>
			        </li>
		        </ul>    
			</div>
		)
	}
}

// Footer.propTypes = {
// 	selectedArea: PropTypes.PropTypes.shape({
// 		id: PropTypes.number.isRequired,
// 		name: PropTypes.string.isRequired
// 	}).isRequired
// }

function mapStateToProps(state) {
	const { selectedArea } = state
	return {
		selectedArea
	}
}

export default connect(mapStateToProps)(Footer)