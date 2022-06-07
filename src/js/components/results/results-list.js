import React from 'react'
import isFinite from 'lodash.isfinite'
import ResultsItemSparkline from '../../components/results/results-item-sparkline.js'
import ResultsItemList from '../../components/results/results-item-list.js'
import UsersComment from '../../components/users/users-comment.js'
import australiaTrend from '../../../data/australia.json'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default class ResultsList extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		document.querySelector('#c17-results').scrollIntoView({ behavior: 'smooth' });
	}

	numberFormat(num) {
		if ( num > 0 ) {
			if ( num > 1000000000 ) { return ( num / 1000000000 ).toFixed(1) + 'bn' }
			if ( num > 1000000 ) { return ( num / 1000000 ).toFixed(1) + 'm' }
			if (num % 1 != 0) { return num.toFixed(1).toLocaleString() }
			else { return num.toLocaleString() }
		}
		if ( num < 0 ) {
			var posNum = num * -1;
			if ( posNum > 1000000000 ) return [String(( posNum / 1000000000 )) + 'bn'];
			if ( posNum > 1000000 ) return [String(( posNum / 1000000 )) + 'm'];
		}
		return num;
	}

	isGreater1(a,b) {
		if (a > b) {
			return "an increase"
		} else if (a < b) {
			return "a decrease"
		} else if (a === b) {
			"has not changed"
		}
	}

	isGreater2(a,b) {
		// console.log(a,b)
		if (a > b) {
			//console.log("increased")
			return "increased"
		} else if (a < b) {
			//console.log("decreased")
			return "decreased"
		} else if (a === b) {
			//console.log("steady")
			return "stayed steady"
		}
	}

	render() {
		const { data, fetchedComments, selectedArea } = this.props

		// Check for missing data
		var dataMissing = 0
		for (let set in data) {
			dataMissing = dataMissing + ( data[set].length >= 3 ? 0 : 1 )
		}
		if ( dataMissing ) {
			return (
				<div className="c17-results-list">
					<div className="c17-container">
						<div className="c17-container-inner">
							<h3>There was a problem fetching your results</h3>
						</div>
					</div>
				</div>
			)
		}


		/****************************
		 EDIT DATA SET DETAILS HERE
		 ****************************/
		const whitelist = {
			persons: {
				title: "Total population",
				desc: `The population of this area was ${this.numberFormat(data.persons[2])} people in 2016. This is ${this.isGreater1(data.persons[2],data.persons[0])} from 2006, when the population was ${this.numberFormat(data.persons[0])}.`,
				isPercentage: false
			},
			median_age: {
				title: "Median age",
				desc: `The median age of people in this area was ${this.numberFormat(data.median_age[2])} in 2016, whereas in 2006 it was ${this.numberFormat(data.median_age[0])}. For all of Australia the median age was ${this.numberFormat(australiaTrend['median_age'][2])}.`,
				isPercentage: false
			},
			percent_female: {
				title: "Female (%)",
				desc: `With a total of ${this.numberFormat(data.female[2])} females, the female proportion of the population in 2016 was ${this.numberFormat(data.percent_female[2])}%. The equivalent figure for all of Australia was ${this.numberFormat(australiaTrend['percent_female'][2])}%.`,
				isPercentage: true
			},
			percent_male: {
				title: "Male (%)",
				desc: `With a total of ${this.numberFormat(data.male[2])} males, the male proportion of the population in 2016 was ${this.numberFormat(data.percent_male[2])}%. At the national level, Australia was ${this.numberFormat(australiaTrend['percent_male'][2])}% male.`,
				isPercentage: true
			},
			average_household_size: {
				title: "Average household size",
				desc: `The average household size ${this.isGreater2(data.average_household_size[2],data.average_household_size[0])} from ${this.numberFormat(data.average_household_size[0])} people per dwelling in 2006 to ${this.numberFormat(data.average_household_size[2])} in 2016. Nationally, the average household size was ${this.numberFormat(australiaTrend['average_household_size'][2])}.`,
				isPercentage: false
			},
			persons_per_bedroom: {
				title: "Average number of persons per bedroom",
				desc: `For homes in this area, the average number of people per bedroom was ${this.numberFormat(data.persons_per_bedroom[2])} in 2016. Nationally, it was ${this.numberFormat(australiaTrend['persons_per_bedroom'][2])}`,
				isPercentage: false
			},
			percent_indig_persons: {
				title: "Indigenous persons (%)",
				desc: `${this.numberFormat(data.percent_indig_persons[2])}% of people in this area identified as Indigenous in 2016, this represents ${this.numberFormat(data.indig_persons[2])} people. The equivalent national figure was ${this.numberFormat(australiaTrend['percent_indig_persons'][2])}% in 2016.`,
				isPercentage: true
			},
			countries_of_birth: {
				title: "Country of birth",
				desc: `The most common country of birth for people in this area in 2016 was ${data.countries_of_birth[2][0]['label']}.`,
				isPercentage: false
			},
			languages: {
				title: "Languages spoken at home other than English",
				desc: `The most common language spoken at home other than English in 2016 was ${data.languages[2][0]['label']}. Nationally, it was ${australiaTrend['languages'][2][0]['label']}.`,
				isPercentage: false
			},
			ancestries: {
				title: "Ancestry",
				desc: `The most common ancestry for people in this area in 2016 was ${data.ancestries[2][0]['label']}.`,
				isPercentage: false
			},
			religions: {
				title: "Religions",
				desc: `The most common religion for people in this area in 2016 was ${data.religions[2][0]['label']}.`,
				isPercentage: false
			},
			median_household_income: {
				title: "Median household income",
				desc: `The median weekly household income in 2016 was $${this.numberFormat(data.median_household_income[2])}. This is ${this.isGreater1(data.median_household_income[2],data.median_household_income[0])} from 2006, where it was $${this.numberFormat(data.median_household_income[0])}. Nationally, the median was $${this.numberFormat(australiaTrend['median_household_income'][2])}.`,
				isPercentage: false
			},
			median_mortgage: {
				title: "Median mortgage",
				desc: `The median monthly mortgage payment in 2016 was $${this.numberFormat(data.median_mortgage[2])}. This is ${this.isGreater1(data.median_mortgage[2],data.median_mortgage[0])} from 2006, where it was $${this.numberFormat(data.median_mortgage[0])}. Nationally, the median was $${this.numberFormat(australiaTrend['median_mortgage'][2])}.`,
				isPercentage: false
			},
			median_rent: {
				title: "Median rent",
				desc: `The median weekly rental payment in 2016 was $${this.numberFormat(data.median_rent[2])}. This is ${this.isGreater1(data.median_rent[2],data.median_rent[0])} from 2006, where it was $${this.numberFormat(data.median_rent[0])}. Nationally, the median was $${this.numberFormat(australiaTrend['median_rent'][2])}.`,
				isPercentage: false
			},
			dwelling_owned_mortgage_percent: {
				title: "Dwellings owned with a mortgage (%)",
				desc: `The percentage of people who owned their own dwelling, with a mortgage, was ${this.numberFormat(data.dwelling_owned_mortgage_percent[2])}% in 2016. The equivalent figure for all Australians was ${this.numberFormat(australiaTrend['dwelling_owned_mortgage_percent'][2])}%.`,
				isPercentage: true
			},
			dwelling_owned_outright_percent: {
				title: "Dwellings owned outright (%)",
				desc: `The percentage of people who owned their own dwelling outright was ${this.numberFormat(data.dwelling_owned_outright_percent[2])}% in 2016. The national percentage was ${this.numberFormat(australiaTrend['dwelling_owned_outright_percent'][2])}%.`,
				isPercentage: true
			},
			dwelling_rented_percent: {
				title: "Dwellings rented (%)",
				desc: `${this.numberFormat(data.dwelling_rented_percent[2])}% of people in this area were renting their home in 2016. This is ${this.isGreater1(data.dwelling_rented_percent[2],data.dwelling_rented_percent[0])} from 2006, where it was ${this.numberFormat(data.dwelling_rented_percent[0])}%. The equivalent figure for all Australians was ${this.numberFormat(australiaTrend['dwelling_rented_percent'][2])}%.`,
				isPercentage: true
			}
		}
		/****************************
		 DATA SET DETAILS END
		 ****************************/

		var comments = []
		var frequency = 0

		if ( fetchedComments.length ){
			let filtered = fetchedComments.filter((item) =>
				item.areaID === selectedArea.id.toString()
			)

			if ( filtered.length ){
				comments = filtered.slice(0, 4)
				frequency = Math.floor(Object.keys(whitelist).length / (comments.length+1))
			}
		}

		var resultList = []
		var i = 0
		var c = 0

		for (let item in whitelist) {
			if ( data[item] ) {
				let result = data[item]
				let details = whitelist[item]

				if ( comments.length && i > 0 && i % frequency === 0 ) {
					if ( comments[c] ){
						resultList.push(<UsersComment comment={comments[c].comment} key={i+100} />)
						c++
					}
				}

				if ( isFinite(result[0]) ) {
					resultList.push(<ResultsItemSparkline details={details} data={result} trendline={details.trendline} key={i} isPercentage={details.isPercentage} />)
				} else {
					resultList.push(<ResultsItemList details={details} data={result} key={i} />)
				}
				
				i++
			}
		}

		return (
			<div className="c17-results-list">
				<div className="c17-container">
					<div className="c17-container-inner">
						{resultList}
					</div>
				</div>
			</div>
		)
	}
}