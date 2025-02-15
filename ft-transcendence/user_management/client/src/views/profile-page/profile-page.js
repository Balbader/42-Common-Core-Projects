import '../dashboard-page/dashboard-page.js';
import {LitElement, html, css} from 'lit';

export class ProfilePage extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html` <dashboard-page></dashboard-page> `;
	}
}
customElements.define('profile-page', ProfilePage);
