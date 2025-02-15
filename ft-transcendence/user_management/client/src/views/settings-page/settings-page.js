import '../../components/settings/settings-component.js';
import { LitElement, html, css } from 'lit';

export class SettingsPage extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html`
			<settings-component class="flex-fill"></settings-component>
		`;
	}
}
customElements.define('settings-page', SettingsPage);
