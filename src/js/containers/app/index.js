import React from 'react'
import Intro from '../intro'
import Search from '../search'
import Results from '../results'
import Footer from '../footer'

export default class App extends React.Component {
	render() {
		return (
			<div className="c17">
				<Intro />
				<Search />
				<Results />
				<Footer />
			</div>
		)
	}
}