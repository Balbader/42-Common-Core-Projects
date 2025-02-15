import ProfilePage from '../../views/profile-page/profile-page.js';
import SettingsPage from '../../views/settings-page/settings-page.js';
import PasswordChangePage from '../../views/pwd-change-page/password-change-page.js';

const routes = {
	ProfilePage,
	SettingsPage,
	PasswordChangePage,
};

const createRouter = () => {
	let state = [window.location.pathname.replace('/', 'home')];

	const goTo = (path) => {
		state.push(path);
		window.history.pushState({ path }, '', `/${path}`);
	};

	const goBack = () => {
		if (state.length === 1) {
			return;
		}

		state.pop();
		window.history.back();
	};

	const currentRoute = () => state.at(-1);
	window.addEventListener('popstate', () => {
		state = [window.location.pathname.replace('/', '')];
	});

	return {
		goTo,
		goBack,
		currentRoute,
	};
};

const router = createRouter();

const renderRoute = () => {
	const appDiv = document.querySelector('#app');
	const currentRoute = router.currentRoute();
	const component = routes[currentRoute]?.();

	if (!component) {
		return appDiv.replaceChildren('404 not found');
	}

	appDiv.replaceChildren(component);
};

export { renderRoute, router };
