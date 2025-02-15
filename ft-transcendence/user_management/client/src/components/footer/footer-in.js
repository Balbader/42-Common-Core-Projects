import { LitElement, html, css } from 'lit';

export class FooterIn extends LitElement {
	static get styles() {
		const { cssRules } = document.styleSheets[0];

		const globalStyle = css([
			Object.values(cssRules)
				.map((rule) => rule.cssText)
				.join('\n'),
		]);

		return [globalStyle, css``];
	}

	render() {
		return html`
			<footer
				class="bg-dark text-white text-center text-lg-start flex-shrink-0"
			>
				<div class="container container-fluid text-center p-3">
					© 2020 Copyright. The Transcendance Corporation,INC.
				</div>
			</footer>
		`;
	}
}
customElements.define('footer-in', FooterIn);
