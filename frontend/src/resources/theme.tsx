const lightTheme = {
	light: '#ffffff',
	main: '#fafafa',
	dark: '#c7c7c7',
};

const darkTheme = {
	light: '#424242',
	main: '#212121',
	dark: '#171717',
};

export const lightPalette = {
	primary: {
		...lightTheme
	},
	secondary: {
		...darkTheme
	},
}

// this swap is necessary to make borders be darker on hover in
// light mode and lighter on hover in dark mode at the same time
export const darkPalette = {
	primary: {
		...darkTheme
	},
	secondary: {
		... lightTheme,
		light: lightTheme.dark,
		dark: lightTheme.light,
	},
}


