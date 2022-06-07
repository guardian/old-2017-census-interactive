import React from 'react'
import orderBy from 'lodash.orderby'

export default class ResultsItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			currentIndex: 2
		}

		this.changeYear = this.changeYear.bind(this);
	}

	changeYear(index){
		this.setState({
			currentIndex: index
		})
	}

	render() {
		const { details, data } = this.props
		const allData = data.map((item) =>
			orderBy(item, 'persons_percent', 'desc').slice(0,5)
		)
		const years = [2006, 2011, 2016]

		return (
			<div className="c17-results-list-item c17-results-list-item_list">
				<div className="c17-container-col-66">
					<h3>{details.title}</h3>
					<p>{details.desc}</p>
					<div className="c17-button-group">
						{ years.map((year, i) =>
							<button key={i} onClick={() => this.changeYear(i)} className={this.state.currentIndex === i ? 'c17-button c17-button-secondary active' : 'c17-button c17-button-secondary'}>{year}</button>
						)}
					</div>
				</div>
				<div className="c17-container-col-33">
					{ years.map((year, i) =>
						<ol key={i} className={this.state.currentIndex === i ? 'c17-list active' : 'c17-list'}>
							{ allData[i].map((item, p) =>
								<li className="c17-list-item" key={p}>
									<span className="c17-list-item-index">{p+1}.</span>
									<span className="c17-list-item-label">{item.label}</span>
									<span className="c17-list-item-value">{ Math.round(parseFloat(item.persons_percent) * 10) / 10 }%</span>
								</li>
							)}
						</ol>
					)}
				</div>
			</div>
		)
	}
}