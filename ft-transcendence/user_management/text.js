import { Task } from '@lit/task';
import { LitElement, html, css } from 'lit';
import { getMe } from '../../utils/rest.js';

export class FriendsComponent extends LitElement {
	static properties = {
		user: {},
		link: { type: String },
		avatarSrc: { type: String },
	};

	_userTask = new Task(this, {
		task: async ([user], { signal }) => {
			const response = await getMe({ signal });
			console.log('Got user:', response);
			this.link = response.image?.link || this.getStoredAvatarSrc() || this.getRandomAvatarSrc();
			this.storeAvatarSrc(this.link);
			return response;
		},
		args: () => [this.user],
	});

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
		this.images = [
			'https://cdn-icons-png.flaticon.com/128/8034/8034504.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034557.png',
			// ... (other image URLs)
			'https://cdn-icons-png.flaticon.com/128/8034/8034561.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034500.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034545.png',
		];
	}

	getRandomAvatarSrc = () => {
		const randomSrc = Math.floor(Math.random() * this.images.length);
		return this.images[randomSrc];
	};

	storeAvatarSrc = (src) => {
		localStorage.setItem('avatarSrc', src);
	};

	getStoredAvatarSrc = () => {
		return localStorage.getItem('avatarSrc');
	};

	render() {
		return this._userTask.render({
			pending: () => html`<p>Loading friends...</p>`,
			complete: (user) => html`
				<div class="container container-fluid h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8 shadow-sm">
						<div class="container-xxl container-fluid">
							<div class="row gy-4 gy-lg-0">
								<div class="col-12 col-lg-4 col-xl-3">
									<div class="row gy-4">
										<div class="col-12">
											<div
												class="card widget-card shadow-sm"
											>
												<div
													class="card-header text-bg-dark"
												>
													Hello,
													${user.displayname
														? user.displayname
														: user.first_name}!
													!
												</div>
												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link}"
															class="img-fluid rounded-circle"
															alt="${user.displayname
																? user.displayname
																: user.first_name}"
														/>
													</div>
													<div
														class="card-body border-dark shadow-sm"
													>
														<h5
															class="text-center mb-1"
														>
															${user.displayname
																? user.displayname
																: user.first_name}
														</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-8 col-xl-9">
									<div class="card widget-card shadow-sm">
										<h5
											style="text-decoration: underline;"
											class="pt-5"
										>
											My Friends
										</h5>
										<div class="row align-items-center">
											<div
												class="col-xl-12 col-lg-12 col-md-12 col-12"
											>
												<!-- Bg -->
												<div
													class="pt-20 rounded-top"
													style="background: url(https://bootdey.com/image/480x480/00FFFF/000000) no-repeat; background-size: cover;"
												></div>
												<div class="py-6">
													<div class="row">
														${this.images.map(
															(img) => html`
																<div
																	class="col-lg-4 col-12"
																>
																	<div
																		class="card mt-5 rounded-3"
																	>
																		<div
																			class="avatar"
																		>
																			<img
																				src="${img}"
																				alt="Image"
																				class="avatar-text avatar-text-primary rounded-circle ml-3 mt-3"
																				style="width: 70px; height: 70px"
																			/>
																		</div>
																		<div
																			class="card-body d-flex justify-content-between"
																		>
																			<div>
																				<h4
																					class="mb-1"
																				>
																					Karina
																					Clark
																				</h4>
																				<span
																					>Online</span
																				>
																			</div>
																			<a
																				href="#!"
																				class="btn btn-sm btn-outline-danger"
																				style="height: 30px;"
																			>
																				Remove
																			</a>
																		</div>
																	</div>
																</div>
															`
														)}
													</div>
												</div>
											</div>
										</div>
										<div class="row gy-4">
											<div class="col-12">
												<div class="">
													<div class="card-body">
														<div
															class="text-center mb-3"
														></div>
													</div>
												</div>
											</div>
										</div>
										<h5
											style="text-decoration: underline;"
											class="pt-5"
										>
											Find Friends
										</h5>
										<div
											class="input-group mb-3 container container-sm"
										>
											<span
												class="input-group-text"
												id="inputGroup-sizing-default"
											>
												Search Friends
											</span>
											<input
												type="text"
												class="form-control"
												aria-label="Sizing example input"
												aria-describedby="inputGroup-sizing-default"
												value="Look for friends online"
											/>
										</div>
										<div class="row align-items-center">
											<div
												class="col-xl-12 col-lg-12 col-md-12 col-12"
											>
												<!-- Bg -->
												<div
													class="pt-20 rounded-top"
													style="background: url(https://bootdey.com/image/480x480/00FFFF/000000) no-repeat; background-size: cover;"
												></div>
												<div class="py-6">
													<div class="row">
														${this.images.map(
															(img) => html`
																<div
																	class="col-lg-4 col-12"
																>
																	<div
																		class="card mt-5 rounded-3"
																	>
																		<div
																			class="avatar"
																		>
																			<img
																				src="${img}"
																				alt="Image"
																				class="img-fluid rounded-circle ml-3 mt-3"
																				style="width: 70px; height: 70px"
																			/>
																		</div>
																		<div
																			class="card-body d-flex justify-content-between"
																		>
																			<div>
																				<h4
																					class="mb-1"
																				>
																					Karina
																					Clark
																				</h4>
																				<span
																					>Online</span
																				>
																			</div>
																			<a
																				href="#!"
																				class="btn btn-sm btn-outline-danger"
																				style="height: 30px;"
																			>
																				Remove
																			</a>
																		</div>
																	</div>
																</div>
															`
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			`,
			error: (e) => html`<p>Error: ${e}</p>`,
		});
	}
}

customElements.define('friends-component', FriendsComponent);
