import { Task } from '@lit/task';
import { LitElement, html, css } from 'lit';
import { getMe } from '../../utils/rest.js';
export class DashboardComponent extends LitElement {
	static properties = {
		user: {},
		link: { type: String },
		data: { type: Array },
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
		this.data = [];
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

	// connectedCallback() {
	// 	super.connectedCallback();
	// 	this.fetchData();
	// }

	// async fetchData() {
	// 	try {
	// 		const response = await fetch('http://localhost:8000/api/mymodels/');
	// 		if (response.ok) {
	// 			this.data = await response.json();
	// 		} else {
	// 			console.error('Failed to fetch data');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// }

	getRandomAvatarSrc = () => {
		const randomSrc = Math.floor(Math.random() * this.images.length);
		return this.images[randomSrc];
	};

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
			pending: () => html`<p>Loading dashboard...</p>`,
			complete: (user) => html`
				<div class="container container-fluid h-100">
					<section class="bg-light py-3 py-md-5 py-xl-8">
						<div class="container container-fluid w-100">
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
													Hello, ${user.first_name}!
												</div>

												<div class="card-body">
													<div
														class="text-center mb-3"
													>
														<img
															src="${this.link}"
															class="img-fluid rounded-circle"
															alt="${user.login
																? user.login
																: user.first_name}"
														/>
													</div>
													<h5
														class="text-center mb-1"
													>
														${user.login
															? user.login
															: user.first_name +
																' ' +
																user.last_name}
													</h5>
												</div>
											</div>

											<div
												class="card-header text-bg-dark mt-3"
											>
												Online Friends
											</div>
											${this.images.map(
												(img) => html`
													<div
														href="#"
														class="list-group-item list-group-item-action border-0 mt-3 shadow-sm"
													>
														<div
															class="d-flex align-items-start col-12"
														>
															<img
																src="${img}"
																class="rounded-circle mr-1"
																alt="Vanessa Tucker"
																width="40"
																height="40"
															/>
															<div
																class="flex-grow-1 ml-3"
															>
																Vanessa Tucker
																<div
																	class="small"
																>
																	<span
																		class="fas fa-circle chat-online"
																	></span>
																	Online
																</div>
															</div>
														</div>
													</div>
												`
											)}
										</div>
									</div>
								</div>

								<div class="col-12 col-lg-9 ">
									<div class="card widget-card shadow-sm">
										<div
											class="card-body container container-xxl"
										>
											<div
												class="tab-content "
												id="profileTabContent"
											>
												<div
													class="tab-pane fade show active"
													id="overview-tab-pane"
													role="tabpanel"
													aria-labelledby="overview-tab"
													tabindex="0"
												>
													<h5
														style="text-decoration: underline;"
														class="mb-3"
													>
														Let's Play Pong!
													</h5>
													<button
														type="submit"
														class="btn btn-primary mt-3"
													>
														Play With A Friend
													</button>
													<button
														type="submit"
														class="btn btn-primary mt-3"
													>
														Play Tournament
													</button>
												</div>

												<h5
													style="text-decoration: underline;"
													class="mb-3 pt-5"
												>
													My Dashboard
												</h5>
												<div class="container">
													<div
														class="row justify-content-center"
													>
														<div
															class="card widget-card border-light shadow-sm"
														>
															<div
																class="card-body p-4"
															>
																<div
																	class="table-responsive"
																>
																	<table
																		class="table table-borderless bsb-table-xl text-nowrap align-middle m-0"
																	>
																		<thead>
																			<tr>
																				<th>
																					Game
																				</th>
																				<th>
																					Date
																				</th>
																				<th>
																					Player
																					1
																				</th>
																				<th>
																					Score
																					P1
																				</th>
																				<th>
																					Player
																					2
																				</th>
																				<th>
																					Score
																					P2
																				</th>
																				<th>
																					Winner
																				</th>
																				<th>
																					Looser
																				</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#1
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						La
																						Mere
																						Noel
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						777
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>La
																						Mere
																						Noel</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>${user.first_name}</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#2
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						54
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Le
																						Chat
																						Potte
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						125
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>Le
																						Chat
																						Potte</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>${user.first_name}</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#3
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						32
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Sophie
																						Lacoste
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						36
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>${user.first_name}</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>Sophie</span
																					>
																				</td>
																			</tr>

																			<tr>
																				<td>
																					<div
																						class="d-flex align-items-center"
																					>
																						<div>
																							<h6
																								class="m-0"
																							>
																								Game
																								#3
																							</h6>
																						</div>
																					</div>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						22/12/2021
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						${user.first_name}
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						Shtrouphette
																					</h6>
																				</td>

																				<td>
																					<h6
																						class="mb-1"
																					>
																						12
																					</h6>
																				</td>

																				<td>
																					<span
																						class=" btn bg-success text-light"
																						>${user.first_name}</span
																					>
																				</td>

																				<td>
																					<span
																						class=" btn bg-danger text-light"
																						>Tie</span
																					>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
													</div>
													<br />

													<h5
														style="text-decoration: underline;"
														class="mb-3 pt-5"
													>
														Tournament Dashboard
													</h5>
													<div class="container">
														<div
															class="row justify-content-center"
														>
															<div
																class="card widget-card border-light shadow-sm"
															>
																<div
																	class="card-body p-4"
																>
																	<div
																		class="table-responsive"
																	>
																		<table
																			class="table table-borderless bsb-table-xl text-nowrap align-middle m-0"
																		>
																			<thead>
																				<tr>
																					<th>
																						Game
																					</th>
																					<th>
																						Date
																					</th>
																					<th>
																						Player
																						1
																					</th>
																					<th>
																						Score
																						P1
																					</th>
																					<th>
																						Player
																						2
																					</th>
																					<th>
																						Score
																						P2
																					</th>
																					<th>
																						Winner
																					</th>
																					<th>
																						Looser
																					</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#1
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							La
																							Mere
																							Noel
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							777
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>La
																							Mere
																							Noel</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>${user.first_name}</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#2
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							54
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Le
																							Chat
																							Potte
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							125
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>Le
																							Chat
																							Potte</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>${user.first_name}</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#3
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							32
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Sophie
																							Lacoste
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							36
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>${user.first_name}</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>Sophie</span
																						>
																					</td>
																				</tr>

																				<tr>
																					<td>
																						<div
																							class="d-flex align-items-center"
																						>
																							<div>
																								<h6
																									class="m-0"
																								>
																									Game
																									#3
																								</h6>
																							</div>
																						</div>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							22/12/2021
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							${user.first_name}
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							Shtrouphette
																						</h6>
																					</td>

																					<td>
																						<h6
																							class="mb-1"
																						>
																							12
																						</h6>
																					</td>

																					<td>
																						<span
																							class=" btn bg-success text-light"
																							>${user.first_name}</span
																						>
																					</td>

																					<td>
																						<span
																							class=" btn bg-danger text-light"
																							>Tie</span
																						>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>
																</div>
															</div>
														</div>
														<br />
														<h5
															style="text-decoration: underline;"
															class="mb-2 pt-3"
														>
															Profile
														</h5>
														<div
															class="card widget-card border-light shadow-sm"
														>
															<div
																class="card-body p-4 widget-card row justify-content-center"
															>
																<div
																	class="tab-content pt-2"
																	id="profileTabContent"
																>
																	<div
																		class="tab-pane fade show active"
																		id="overview-tab-pane"
																		role="tabpanel"
																		aria-labelledby="overview-tab"
																		tabindex="0"
																	>
																		<div
																			class="row g-0"
																		>
																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					First
																					Name
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.first_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Last
																					Name
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.last_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Username
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.login
																						? user.login
																						: user.first_name +
																							' ' +
																							user.last_name}
																				</div>
																			</div>

																			<div
																				class="col-5 col-md-3 bg-light border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					Email
																				</div>
																			</div>
																			<div
																				class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3"
																			>
																				<div
																					class="p-2"
																				>
																					${user.email}
																				</div>
																			</div>
																			<div>
																				<a
																					type="button"
																					aria-current="page"
																					class="nav-link btn btn-primary mt-3"
																					href="/app/settings"
																				>
																					Update
																					Profile
																					Info
																				</a>
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
customElements.define('dashboard-component', DashboardComponent);
