import '../nav-bar/nav-bar-out.js';
import '../signup/sign-up-component.js';
import '../footer/footer-out.js';
import { LitElement, html, css } from 'lit';

export class HomeComponent extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html`
			<nav-bar-out></nav-bar-out>
			<sign-up-component></sign-up-component>
			<footer-out></footer-out>
		`;
	}
}
customElements.define('home-component', HomeComponent);
