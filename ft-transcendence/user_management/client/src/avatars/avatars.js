const images = [
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

const getRandomAvatarSrc = () => {
	const randomSrc = Math.floor(Math.random() * this.images.length);
	return images[randomSrc];
};

export default getRandomAvatarSrc;
