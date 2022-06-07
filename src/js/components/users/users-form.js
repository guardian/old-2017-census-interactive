import React from 'react'
import 'whatwg-fetch'
import PropTypes from 'prop-types'

export default class UsersForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			contact: '',
			comment: '',
			nameValid: false,
			contactValid: false,
			commentValid: false,
			hasSubmitted: false,
			isSubmitting: false,
			attemptedSubmit: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const val = event.target.value
		switch ( event.target.name ){
			case 'name': 
				this.setState({ 
					name: val,
					nameValid: val !== '' ? true : false
				}) 
				break
			case 'contact': 
				this.setState({ 
					contact: val,
					contactValid: val !== '' ? true : false
				}) 
				break
			case 'comment': 
				this.setState({ 
					comment: val,
					commentValid: val !== '' ? true : false
				}) 
				break
			default: 
				console.log('Unknown input')
		} 
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			var error = new Error(response.statusText)
			error.response = response
			throw error
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		const { name, contact, comment, commentValid, nameValid, contactValid, isSubmitting, hasSubmitted } = this.state
		this.setState({attemptedSubmit: true})

		if ( !hasSubmitted && !isSubmitting && this.props.selectedArea.id > 0 ) {		
			if ( commentValid && nameValid && contactValid ){
				this.setState({isSubmitting: true})

				var formData = new FormData()
				formData.append('entry.1876647601', name)
				formData.append('entry.1420978106', contact)
				formData.append('entry.1964815681', comment)
				formData.append('entry.629041112', this.props.selectedArea.id)

				fetch('https://docs.google.com/forms/d/e/1FAIpQLSc4pntzwa_I56baZHChRnh48rkxJGnF8UVKPiF6Vb7NC6-qmw/formResponse', {
						method: 'POST',
						mode: 'no-cors',
						body: formData
					})
					.then(this.checkStatus)
					.then(response => response.text())
					.then(
						text => console.log(text),
						() => this.setState({
							hasSubmitted: true, 
							isSubmitting: false
						}),
						error => {
							console.log(error)
						})
			}
		}
	}

	render() {
		const { name, contact, comment, nameValid, contactValid, commentValid, hasSubmitted, attemptedSubmit, isSubmitting } = this.state
		var formClass = 'c17-user-form'
		formClass = attemptedSubmit ? formClass + ' c17-user-form--show-validation' : formClass
		formClass = isSubmitting ? formClass + ' c17-user-form--submitting' : formClass

		return (
			<section className="c17-user">
				<div className="c17-container c17-bg-grey">
					<div className="c17-container-inner">
						<h2>Tell us about this area</h2>
						<p>Now that you've seen how the demographics have changed (or not) for this area, tell us your experience in living or visiting here. Your comments will be moderated and then may be republished in this feature. We're also interested in speaking to people with interesting experiences, so please include your name and contact details so our reporters can contact you if needed.</p>
					</div>
				</div>
				<div className="c17-container c17-bg-grey">
					<div className="c17-container-inner">
						{ !hasSubmitted 
							? <form className={formClass} onSubmit={this.handleSubmit}>
								<div className="c17-container-col-50 c17-user-form-pad-right">
									<label className={nameValid ? 'c17-user-form-input' : 'c17-user-form-input c17-user-form-input--invalid'}> 
										<span>Name</span>
										<small>This may be published</small>
										<input type="text" name="name" value={name} onChange={this.handleChange} disabled={isSubmitting ? 'disabled' : false} />
										<div className="c17-user-form-input-msg"><small>This is required</small></div>
									</label>
								</div>
								<div className="c17-container-col-50 c17-user-form-pad-left">
									<label className={contactValid ? 'c17-user-form-input' : 'c17-user-form-input c17-user-form-input--invalid'}> 
										<span>Email or phone number</span>
										<small>This will not be published</small>
										<input type="text" name="contact" value={contact} onChange={this.handleChange} disabled={isSubmitting ? 'disabled' : false} />
										<div className="c17-user-form-input-msg"><small>This is required</small></div>
									</label>
								</div>
								<div className="c17-container-col-100">
									<label className={commentValid ? 'c17-user-form-input' : 'c17-user-form-input c17-user-form-input--invalid'}> 
										<span>Tell us your experience of {this.props.selectedArea.name}</span>
										<small>This may be published</small>
										<textarea name="comment" rows="4" value={comment} onChange={this.handleChange} disabled={isSubmitting ? 'disabled' : false} />
										<div className="c17-user-form-input-msg"><small>This is required</small></div>
									</label>
								</div>
								<div className="c17-container-col-100 text-right">
									<input type="submit" value="Submit" className="c17-button" disabled={isSubmitting ? 'disabled' : false} />
								</div>
							</form>
							: <div className="c17-user-form-submitted"><h3>Thank you for your comments!</h3></div>
						}
					</div>
				</div>
			</section>
		)
	}
}

UsersForm.propTypes = {
	selectedArea: PropTypes.PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
}