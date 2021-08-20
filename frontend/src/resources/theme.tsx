import { createMuiTheme } from "@material-ui/core";
import { createContext, useState } from "react";

export const DarkModeContext = createContext<{darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>>}>({} as any);

export const [darkMode, setDarkMode] = useState<boolean>(false);

const light = {
	main: '#fafafa'
};

const dark = {
	main: '#424242'
};

const lightPalette = {
	primary: {
		main: light.main,
	},
	secondary: {
		main: dark.main,
	},
}

const darkPalette = {
	primary: {
		main: light.main,
	},
	secondary: {
		main: dark.main,
	},
}

export const theme = createMuiTheme({
	palette: darkMode? lightPalette : darkPalette
});
