import React from 'react'
import GraphsSparkline from '../graphs/sparkline.js'

export default class ResultsItemSparkline extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { details, data, isPercentage, trendline } = this.props

		return (
			<div className="c17-results-list-item c17-results-list-item_sparkline">
				<div className="c17-container-col-66">
					<h3>{details.title}</h3>
					<p>{details.desc}</p>
				</div>
				<div className="c17-container-col-33">
					<GraphsSparkline data={data} isPercentage={isPercentage} trendline={trendline} />
				</div>
			</div>
		)
	}
}