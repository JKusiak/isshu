import { Shadows } from "@material-ui/core/styles/shadows";

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

// this swap is necessary to make fonts readible in dark mode
export const darkPalette = {
	primary: {
		...darkTheme
	},
	secondary: {
		light: lightTheme.main,
		main: lightTheme.dark,
		dark: lightTheme.dark,
	},
}

// anti shadows mirror depth from light mode on dark mode, only
// one used in the project is the sixth shadow
export function getAntiShadows() {
	let antiShadows = Array(19).fill("none");
	antiShadows[5] = "0px 3px 1px -2px rgba(255,255,255,0.05),0px 2px 2px 0px rgba(255,255,255,0.14),0px 1px 5px 0px rgba(255,255,255,0.12)";

	return antiShadows as Shadows;
}

// necessary for ensuring on hover visibility of button background in dark mode
export const overrides = {
	MuiIconButton: {
        root: {
          '&:hover': {
            backgroundColor: '#575757',
          }
        }
    },
	MuiButton: {
        root: {
          '&:hover': {
            backgroundColor: '#575757',
          }
        }
    },
	MuiMenuItem: {
		root: {
			'&:hover': {
			  backgroundColor: '#575757',
			}
		  }
	}
}


