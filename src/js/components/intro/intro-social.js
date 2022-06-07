import React from 'react'

export default class IntroSocial extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const selectedArea = this.props.selectedArea
		
		const area = selectedArea.id > 0 ? '?area=' + selectedArea.id : ''
		const href = encodeURIComponent('https://www.theguardian.com/australia-news/datablog/ng-interactive/2017/jun/27/census-stories-how-has-your-town-or-suburb-changed-over-10-years' + area)
		const text = encodeURIComponent('Census stories: how has your area changed over 10 years?')

		var facebook = `https://www.facebook.com/dialog/share?app_id=180444840287&href=${href}`
		var twitter = `https://twitter.com/intent/tweet?text=${text}&url=${href}`
		var email = `mailto:?subject=${text}&body=${href}`

		return (
			<div className="c17-intro-social">
				<ul className="c17-intro-social-share social social--top u-unstyled u-cf" data-component="social">
					<li className="social__item social__item--facebook " data-link-name="facebook">
						<a className="social__action js-social__action--top social-icon-wrapper" data-link-name="social top" href={facebook} target="_blank" title="Facebook">
							<span className="inline-icon__fallback button share-modal__item share-modal__item--facebook">Share on Facebook</span>
							<span className="inline-share-facebook inline-icon rounded-icon centered-icon social-icon social-icon--facebook">
								<svg width="32" height="32" viewBox="-2 -2 32 32" className="rounded-icon__svg centered-icon__svg social-icon__svg social-icon--facebook__svg inline-share-facebook__svg inline-icon__svg">
									<path d="M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z"></path>
								</svg>
							</span>
						</a>
					</li>
					<li className="social__item social__item--twitter " data-link-name="twitter">
						<a className="social__action js-social__action--top social-icon-wrapper" data-link-name="social top" href={twitter} target="_blank" title="Twitter">
							<span className="inline-icon__fallback button share-modal__item share-modal__item--twitter">Share on Twitter</span>
							<span className="inline-share-twitter inline-icon rounded-icon centered-icon social-icon social-icon--twitter">
								<svg width="32" height="32" viewBox="-2 -2 32 32" className="rounded-icon__svg centered-icon__svg social-icon__svg social-icon--twitter__svg inline-share-twitter__svg inline-icon__svg">
									<path d="M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z"></path>
								</svg>
							</span>
						</a>
					</li>
					<li className="social__item social__item--email " data-link-name="email">
						<a className="social__action js-social__action--top social-icon-wrapper" data-link-name="social top" href={email} target="_blank" title="Email">
							<span className="inline-icon__fallback button share-modal__item share-modal__item--email">Share via Email</span>
							<span className="inline-share-email inline-icon rounded-icon centered-icon social-icon social-icon--email">
								<svg width="32" height="32" viewBox="0 0 32 32" className="rounded-icon__svg centered-icon__svg social-icon__svg social-icon--email__svg inline-share-email__svg inline-icon__svg">
									<path d="M23.363 20.875H8.637v-8.938l6.545 5.687h1.637l6.544-5.687v8.938zm-1.635-9.75L16 16l-5.728-4.875h11.456zM23.363 9.5H8.637L7 11.125v9.75L8.637 22.5h14.727L25 20.875v-9.75L23.363 9.5z"></path>
								</svg>
							</span>
						</a>
					</li>
				</ul>
			</div>
		)
	}
}