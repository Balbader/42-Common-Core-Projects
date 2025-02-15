import { LitElement, html, css } from 'lit';

export class LoginComponent extends LitElement {
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
			<section class="vh-100" style="background-color: #eee;">
				<div class="container h-100">
					<div
						class="row d-flex justify-content-center align-items-center h-100"
					>
						<div class="col-lg-12 col-xl-11">
							<div
								class="card text-black"
								style="border-radius: 25px;"
							>
								<div class="card-body p-md-5">
									<div class="row justify-content-center">
										<div
											class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
										>
											<p
												class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
											>
												Login
											</p>

											<form class="mx-1 mx-md-4">
												<div
													class="d-flex flex-row align-items-center mb-4"
												>
													<i
														class="fas fa-envelope fa-lg me-3 fa-fw"
													></i>
													<div
														data-mdb-input-init
														class="form-outline flex-fill mb-0"
													>
														<input
															name="email"
															type="email"
															id="form3Example3c"
															class="form-control"
															placeholder="email"
														/>
													</div>
												</div>

												<div
													class="d-flex flex-row align-items-center mb-4"
												>
													<i
														class="fas fa-lock fa-lg me-3 fa-fw"
													></i>
													<div
														data-mdb-input-init
														class="form-outline flex-fill mb-0"
													>
														<input
															name="password"
															type="password"
															id="form3Example4c"
															class="form-control"
															placeholder="Password"
														/>
													</div>
												</div>

												<div
													class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
												>
													<button
														type="button"
														data-mdb-button-init
														data-mdb-ripple-init
														class="btn btn-primary btn-lg w-100"
													>
														Login
													</button>
												</div>
											</form>

											<div
												class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
											>
												<form
													action="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-e6514ae93c2f3f3c25c6c98db2627ae8b9c70362848bea099f4e972c73370ec3&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code"
												>
													<button
														type="submit"
														data-mdb-button-init
														data-mdb-ripple-init
														class="btn btn-outline-dark btn-lg w-100"
													>
														Login With 42
													</button>
												</form>
											</div>
										</div>
										<div
											class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
										>
											<img
												src="./src/components/nav-bar/nav-bar-assets/ping-pong.png"
												class="img-fluid"
												alt="Pong Logo"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		`;
	}
}
customElements.define('login-component', LoginComponent);
