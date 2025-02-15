import '../../components/nav-bar/nav-bar-out.js';
import '../../components/login/login-component.js';
import '../../components/footer/footer-out.js';
import { LitElement, html, css } from 'lit';

export class LoginPage extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html`
			<nav-bar-out></nav-bar-out>
			<login-component></login-component>
			<footer-out></footer-out>
		`;
	}
}
customElements.define('login-page', LoginPage);
