import { LitElement, html, css } from 'lit';

export class NavBarIn extends LitElement {
	static get styles() {
		const { cssRules } = document.styleSheets[0];

		const globalStyle = css([
			Object.values(cssRules)
				.map((rule) => rule.cssText)
				.join('\n'),
		]);

		return [globalStyle, css``];
	}

	constructor() {
		super();
	}

	render() {
		return html`
			<nav class="bg-dark navbar navbar-expand-lg navbar-dark">
				<div class="container-fluid pl-5">
					<div
						class="collapse navbar-collapse"
						id="navbarSupportedContent"
					>
						<a class="navbar-brand mt-lg-2" href="home">
							FT_TRANSCENDENCE
						</a>
					</div>

					<div class="d-flex align-items-center">
						<ul class="navbar-nav d-flex align-items-center">
							<li class="nav-item">
								<a class="nav-link" href="/app/dashboard"
									>Dashboard</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/app/friends"
									>Friends</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/app/settingsPage"
									>Settings</a
								>
							</li>

							<li class="nav-item">
								<a
									class="nav-link"
									href="/app/passwordChangePage"
									>Password</a
								>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="/logout">Logout</a>
							</li>
						</ul>
					</div>
						</a>
					</div>
				</div>
			</nav>
		`;
	}
}
customElements.define('nav-bar-in', NavBarIn);
