import React from 'react'

export default class SearchMapIntro extends React.Component {
	render() {
		return (
			<div>
				<div className="c17-search-divider">
					<h2 className="c17-bg-grey">or</h2>
				</div>
				<h2>Find on the map</h2>
				<p>Click on an area in the map below to see its data, or click on the <span className="textHighlight">highlighted areas</span> to see reader comments.</p>
			</div>
		)
	}
}