import React from 'react'
import debounce from 'lodash.debounce'
import Autosuggest from 'react-autosuggest';
import autocompleteData from '../../../data/autocomplete.json'

export default class SearchInput extends React.Component {
	constructor(props) {
		super(props)

		// Autosuggest is a controlled component.
		// This means that you need to provide an input value
		// and an onChange handler that updates this value (see below).
		// Suggestions also need to be provided to the Autosuggest,
		// and they are initially empty because the Autosuggest is closed.
		this.state = { 
			value: '',
			suggestions: [],
			shortened: false,
			count: 0
		}

		this.onChange = this.onChange.bind(this)
		this.renderSuggestion = this.renderSuggestion.bind(this)
		this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
	}

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions(value) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		var suggestions = autocompleteData.filter(item =>
			item.label.toLowerCase().includes(value.toLowerCase())
		)

		if ( suggestions.length > 10 ){
			this.setState({ 
				shortened: true,
				count: suggestions.length
			})
			suggestions = suggestions.slice(0, 10)
		} else {
			this.setState({ 
				shortened: false,
				count: suggestions.length
			})
		}

		return inputLength <= 2 ? [] : suggestions
	};

	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue(suggestion) {
		return suggestion.label
	}

	// Use your imagination to render suggestions.
	renderSuggestion(suggestion) {
		return(<span>{suggestion.label}</span>)
	}

	onChange(event, { newValue }) {
		this.setState({
			value: newValue
		})
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
		this.setState({
			suggestions: this.getSuggestions(value)
		})
	}

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
		this.setState({
			suggestions: [],
			count: 0,
			shortened: false
		})
	}

	onSuggestionSelected(event, { suggestion }) {
		document.activeElement.blur();
		this.props.handleChange(suggestion.id, suggestion.label)
		var updateMap = new CustomEvent('c17_areaUpdated', {'detail': suggestion.id})
		window.dispatchEvent(updateMap);
	}

	renderSuggestionsContainer({ containerProps, children, query }) {
		return (
			<div {...containerProps}>
				{!children || children.length === 0 ? (
					<div>No matches for <strong>{query}</strong></div>
				) : 
					<div>Select the best option below:</div>
				}
				{children}
				{this.state.shortened &&
					<div>Showing 10 of {this.state.count} results.</div>
				}
			</div>
		)
	}

	componentWillMount() {
		if ( this.props.selectedArea.id > 0 ){
			this.setState({
				value: this.props.selectedArea.name
			})
		}
	}

	render() {
		const { value, suggestions } = this.state

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
			placeholder: 'Enter a placename to begin',
			value,
			onChange: this.onChange
		}

		// Finally, render it!
		return (
			<div>
				<h2>Search</h2>
				<div className="c17-search-input">
					<label htmlFor="area-search-input" className="c17-sr-only">Search by placename</label>
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						onSuggestionSelected={this.onSuggestionSelected}
						getSuggestionValue={this.getSuggestionValue}
						renderSuggestion={this.renderSuggestion}
						renderSuggestionsContainer={this.renderSuggestionsContainer}
						inputProps={inputProps}
						highlightFirstSuggestion={true}
					/>
				</div>
			</div>	
		);
	}
}