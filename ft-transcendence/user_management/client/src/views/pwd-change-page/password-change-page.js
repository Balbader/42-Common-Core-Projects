import '../../components/password/password-change-component.js';

import { LitElement, html } from 'lit';

export class PasswordChangePage extends LitElement {
	render() {
		return html`
			<password-change-component
				class="flex-fill"></password-change-component>
		`;
	}
}
customElements.define('password-change-page', PasswordChangePage);
