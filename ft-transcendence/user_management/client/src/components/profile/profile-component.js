import { LitElement, html, css } from 'lit';

export class ProfileComponent extends LitElement {
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
			<section class="bg-light py-3 py-md-5 py-xl-8 h-100">
				<div class="container container-xxl">
					<div class="row gy-4 gy-lg-0">
						<div class="col-12 col-lg-4 col-xl-3 shadow-sm">
							<div class="row gy-4">
								<div class="col-12">
									<div
										class="card widget-card border-dark-subtle shadow-sm"
									>
										<div class="card-header text-bg-dark">
											Hello, Ethan Leo!
										</div>

										<div class="card-body shadow-sm">
											<div
												class="text-center mb-3 shadow-sm"
											>
												<img
													src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
													class="img-fluid rounded-circle"
													alt="Luna John"
												/>
												<h5 class="text-center mb-1">
													Ethan Leo
												</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-8 col-xl-9">
							<div class="card widget-card border-dark shadow-sm">
								<div class="card-body">
									<div
										class="tab-content pt-4"
										id="profileTabContent"
									>
										<div
											class="tab-pane fade show active"
											id="overview-tab-pane"
											role="tabpanel"
											aria-labelledby="overview-tab"
											tabindex="0"
										>
											<h5 class="mb-3">Profile</h5>
											<div class="row g-0">
												<div
													class="col-5 col-md-3 bg-light border-bottom border-white border-3"
												>
													<div class="p-2">
														First Name
													</div>
												</div>

												<div
													class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
												>
													<div class="p-2">Ethan</div>
												</div>

												<div
													class="col-5 col-md-3 bg-light border-bottom border-white border-3"
												>
													<div class="p-2">
														Last Name
													</div>
												</div>

												<div
													class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
												>
													<div class="p-2">Leo</div>
												</div>

												<div
													class="col-5 col-md-3 bg-light border-bottom border-white border-3"
												>
													<div class="p-2">
														Date Of Birth
													</div>
												</div>

												<div
													class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
												>
													<div class="p-2">
														08/06/1932
													</div>
												</div>

												<div
													class="col-5 col-md-3 bg-light border-bottom border-white border-3"
												>
													<div class="p-2">
														Country
													</div>
												</div>

												<div
													class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
												>
													<div class="p-2">
														United States
													</div>
												</div>

												<div
													class="col-5 col-md-3 bg-light border-bottom border-white border-3"
												>
													<div class="p-2">Email</div>
												</div>

												<div
													class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
												>
													<div class="p-2">
														leo@example.com
													</div>
												</div>

												<div>
													<button
														type="button"
														aria-current="page"
														class="btn btn-primary mt-3"
														href="login"
													>
														Update Profile Info
													</button>
												</div>
											</div>
										</div>
										<div
											class="tab-pane fade"
											id="profile-tab-pane"
											role="tabpanel"
											aria-labelledby="profile-tab"
											tabindex="0"
										></div>
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
customElements.define('profile-component', ProfileComponent);
