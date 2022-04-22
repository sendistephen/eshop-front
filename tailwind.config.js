module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
	],
};
