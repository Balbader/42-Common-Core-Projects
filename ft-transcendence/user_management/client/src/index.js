import { LitElement, html } from 'lit';
import { Router } from '@lit-labs/router';
import './views/profile-page/profile-page.js';
import './components/settings/settings-component.js';
import './components/friends/freinds-component.js';
import './views/pwd-change-page/password-change-page.js';
import './components/nav-bar/nav-bar-out.js';
import './components/nav-bar/nav-bar-in.js';
import './components/footer/footer-out.js';
import './components/footer/footer-in.js';

class AppRoot extends LitElement {
	router = new Router(this, [
		{ path: '/app/', render: () => html`<profile-page></profile-page>` },
		{
			path: '/app/dashboard',
			render: () => html`<profile-page></profile-page>`,
		},
		{
			path: '/app/friends',
			render: () => html`<freinds-component></freinds-component>`,
		},
		{
			path: '/app/settingsPage',
			render: () => html`<settings-component></settings-component>`,
		},
		{
			path: '/app/passwordChangePage',
			render: () => html`<password-change-page></password-change-page>`,
		},
		{
			path: '/logout',
			render: () => (location.href = '/logout'),
		},
	]);

	render() {
		return html`
			<nav-bar-in></nav-bar-in>
			${this.router.outlet()}
		`;
	}
}
customElements.define('app-root', AppRoot);
