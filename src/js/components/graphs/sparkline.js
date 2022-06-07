import React from 'react'
import PropTypes from 'prop-types'
import * as blah from 'd3'
const d3 = blah.__moduleExports

export default class GraphsSparkline extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { data, trendline, isPercentage } = this.props
	
		const yearLabels = [2006,2011,2016]
		const dmin = d3.min(data)
		const dmax = d3.max(data)
		const tmin = d3.min(data)
		const tmax = d3.max(data)
		const min = dmin < tmin ? dmin : tmin
		const max = dmax < tmax ? dmax : tmax
		const x = d3.scaleLinear().domain([0, data.length-1]).range([3, 240])
		const y = d3.scaleLinear().domain([min, max]).range([30, 0])
		const dataline = d3.line().x((d,i) => x(i)).y((d) => y(d))

		var elements = []
		
		if ( data ){
			// Line
			elements.push(<path d={dataline(data)} key="10" />)
			// Labels and dots
			data.map(function(point, i) {
				if ( i <= 0 || i === data.length-1 ) {
					elements.push(<text x={x(i)} y={y(point) - 10} key={i}>{ isPercentage ? (Math.round(parseFloat(point) * 10) / 10) + '%' : point}</text>)
					elements.push(<circle cx={x(i)} cy={y(point)} r={3} key={'circle' + i}></circle>)
				}
			})
		}

		return (
			<svg className="c17-graph-sparkline" viewBox="0 0 245 70" preserveAspectRatio="xMidYMin slice" width="100%" style={{height: '1px', paddingBottom: '29%', overflow: 'visible'}}>
				<g transform="translate(0,23)">
					{elements}
				</g>
			</svg>
		)
	}
}

GraphsSparkline.propTypes = {
	data: PropTypes.array.isRequired,
	trendline: PropTypes.array,
	isPercentage: PropTypes.bool.isRequired
}