const lightTheme = {
	dark: 'f5f5f5',
	main: '#fafafa',
	light: '#ffffff',
};

const darkTheme = {
	light: '#676767',
	main: '#424242',
	dark: '#2e2e2e',
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


