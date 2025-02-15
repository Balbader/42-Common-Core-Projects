import { Task } from '@lit/task';
import { LitElement, html, css } from 'lit';
import { getMe } from '../../utils/rest.js';

export class FreindsComponent extends LitElement {
	static properties = {
		user: {},
		link: { type: String },
	};

	_userTask = new Task(this, {
		task: async ([user], { signal }) => {
			const response = await getMe({ signal });
			console.log('Ky got user:', response);
			if (response.image?.link) {
				this.link = response.image.link;
				return response;
			}
			const storedAvatar = this.getStoredAvatarSrc(response.email);
			if (storedAvatar) {
				this.link = storedAvatar;
			} else {
				const random = this.getRandomAvatarSrc();
				this.storeAvatarSrc(response.email, random);
				this.link = random;
			}
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
		this.link = '';
		this.images = [
			'https://cdn-icons-png.flaticon.com/128/8034/8034504.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034557.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034553.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034539.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034535.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034525.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034520.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034518.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034514.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034492.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034484.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034478.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034474.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034468.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034455.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034451.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034448.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034441.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034439.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034561.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034500.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034545.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034530.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034508.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034444.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034550.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034489.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034464.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034459.png',
			'https://cdn-icons-png.flaticon.com/128/8034/8034559.png',
		];
	}

	storeAvatarSrc = (email, src) => {
		if (!email || typeof email !== 'string') {
			throw new Error(
				'Unable to store avatar without an email, got: ' + email
			);
		}
		if (!src || typeof src !== 'string') {
			throw new Error(
				'Unable to store avatar without a src, got: ' + src
			);
		}
		const avatars = localStorage.getItem('avatars');
		const parsed = avatars ? JSON.parse(avatars) : {};
		parsed[email] = src;
		const stringified = JSON.stringify(parsed);
		localStorage.setItem('avatars', stringified);
	};
	getStoredAvatarSrc = (email) => {
		if (!email || typeof email !== 'string') {
			throw new Error(
				'Unable to store avatar without an email, got: ' + email
			);
		}
		const avatars = localStorage.getItem('avatars');
		const parsed = avatars ? JSON.parse(avatars) : {};
		return parsed[email] || '';
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
																: user.first_name +
																	' ' +
																	user.last_name}
														</h5>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-12 col-lg-8 col-xl-9">
									<div class="card widget-card shadow-sm p-3">
										<div class="row align-items-center">
											<div>
												<h5
													style="text-decoration: underline;"
													class=""
												>
													My Friends
												</h5>
												<!-- Bg -->
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

customElements.define('freinds-component', FreindsComponent);
