import '../../components/home/home-component.js';
import { LitElement, html, css } from 'lit';

export class HomePage extends LitElement {
	constructor() {
		super();
	}

	render() {
		return html` <home-component></home-component> `;
	}
}
customElements.define('home-page', HomePage);
