/** @jsx NavVBafOut */
import { LitElement, html, css } from 'lit';

export class NavBarOut extends LitElement {
	static get styles() {
		const { cssRules } = document.styleSheets[0];

		const globalStyle = css([
			Object.values(cssRules)
				.map(rule => rule.cssText)
				.join('\n'),
		]);

		return [globalStyle, css``];
	}

	constructor() {
		super();
		this.imgPath = {
			path: './src/components/nav-bar/nav-bar-assets/ping-pong (1).png',
		};
	}

	render() {
		return html`
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container-fluid">
					<a
						class="navbar-brand"
						href="home"
					>
						<img
							src="${this.imgPath.path}"
							alt=""
							width="70"
							height="60"
							class="d-inline-block align-text-center navbar-brand"
						/>
						FT_TRANSCENDANCE
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>

					<div
						class="collapse navbar-collapse text-bg-dark"
						id="navbarTogglerDemo02"
					>
						<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="home"
								>
									Home
								</a>
							</li>

							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="about"
								>
									About
								</a>
							</li>

							<li class="nav-item pe-3">
								<a
									class="nav-link"
									aria-current="page"
									href="whoWeAre"
								>
									Who We Are
								</a>
							</li>

							<li class="nav-item pe-3">
								<button
									type="button"
									aria-current="page"
									class="btn btn-outline-light"
									href="login"
								>
									Login
								</button>
							</li>

							<li class="nav-item">
								<button
									type="button"
									aria-current="page"
									class="btn btn-warning"
									href="SignUp"
								>
									SignUp
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		`;
	}
}
customElements.define('nav-bar-out', NavBarOut);
