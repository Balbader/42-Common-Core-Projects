import '../../components/dashboard/dashboard-component.js';
import { LitElement, html, css } from 'lit';

export class DashboardPage extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html`
			<dashboard-component class="flex-fill"></dashboard-component>
		`;
	}
}
customElements.define('dashboard-page', DashboardPage);
