import React from 'react'

export default class UsersComment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isExpanded: false
		}

		this.toggleComment = this.toggleComment.bind(this)
	}

	toggleComment() {
		this.setState({
			isExpanded: this.state.isExpanded ? false : true
		})
	}

	render() {
		const isExpanded = this.state.isExpanded
		var comment = this.props.comment

		if ( !isExpanded ) {
			comment = comment.slice(0, 100).trim()
			comment += '...'
		}

		return (
			<div className="c17-user-comment">
				<div className="c17-user-comment-quote">"</div>
				<p>{comment}</p>
				<p className="text-right">
					<button className={!isExpanded ? 'c17-button c17-button-secondary c17-user-comment-button-more' : 'c17-button c17-button-secondary'} onClick={this.toggleComment}>
						<svg width="24" height="18" viewBox="0 0 24 18">
							<path d="M.4 15.3l10.5-8.4L12 6l1.1.9 10.5 8.4-.5.7L12 9.7.9 16l-.5-.7z"></path>
						</svg>{isExpanded ? 'show less' : 'show more'}
					</button>
				</p>
			</div>
		)
	}
}