module.exports.oauth = {
	tokens: {
		access: {
			length: 32,
			life: 3600, // 1 hour
		},
		refresh: {
			length: 32,
			life: (3600 * 24 * 90), // 90 days
		},
	},
	clients: {
		'5746f32e39485d1103b31254': {
			name: 'Mobile app',
		},
	},
};
