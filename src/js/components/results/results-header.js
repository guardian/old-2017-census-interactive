import React from 'react'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default class ResultsHeader extends React.Component {
	constructor(props) {
		super(props)

		this.scrollTo = this.scrollTo.bind(this)
	}

	scrollTo() {
		document.querySelector('#c17-search').scrollIntoView({ behavior: 'smooth' });
	}

	render() {
		return (
			<div className="c17-results-header">
				<div className="c17-container c17-bg-grey">
					<div className="c17-container-inner">
						<h2>Results for: <span>{this.props.selectedArea}</span></h2>
						<button className="c17-button" onClick={this.scrollTo}>
							<svg width="24" height="18" viewBox="0 0 24 18">
								<path d="M.4 15.3l10.5-8.4L12 6l1.1.9 10.5 8.4-.5.7L12 9.7.9 16l-.5-.7z"></path>
							</svg>back to search
						</button>
					</div>
				</div>
			</div>
		)
	}
}