import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GetHomePage from './api/Authentication/GetHomePage';
import { getLoggedInUser } from './api/User/GetLoggedInUser';
import Navbar from './layout/Navbar';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/Project/ProjectPage';
import RegisterPage from './pages/RegisterPage';
import TitlePage from './pages/TitlePage';
import UserPage from './pages/UserPage';
import { darkPalette, getAntiShadows, lightPalette, overrides } from './resources/theme';
import { JWTUserTemplate } from './types/ModelContentTemplate';
import { JWTTokenUser } from './types/ModelTypes';


export const DarkModeContext = createContext<{ darkMode: boolean, setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }>({} as any);
export const IsLoggedInContext = createContext<{ isLoggedIn: boolean, setLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }>({} as any);
export const AuthUserContext = createContext<{ loggedInUser: JWTTokenUser, setLoggedInUser: React.Dispatch<React.SetStateAction<JWTTokenUser>> }>({} as any);

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState<boolean>(
		localStorage.getItem('token') ? true : false
	);

	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem('darkMode') === 'true' ? true : false
	);

	const [loggedInUser, setLoggedInUser] = useState<JWTTokenUser>(
		isLoggedIn ? getLoggedInUser() : JWTUserTemplate
	);

	const defaultTheme = createMuiTheme();
	const theme = createMuiTheme({
		palette: darkMode ? darkPalette : lightPalette,
		shadows: darkMode ? getAntiShadows() : defaultTheme.shadows,
		overrides: darkMode ? overrides : undefined
	});

	axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	axios.defaults.baseURL = 'http://localhost:5000/';


	return (
		<ThemeProvider theme={theme}>
			<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
				<IsLoggedInContext.Provider value={{ isLoggedIn, setLoggedIn }}>
					<AuthUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
						<CssBaseline>
							<Helmet>
								<title>Isshu.</title>
								<meta name="description" content="Minimalistic bug tracking tool for small sized teams" />
								<style>{`body { background-color: ${theme.palette.primary.main}; }`}</style>
							</Helmet>
							
							<Router>
								<Navbar />
								<Switch>
									<Route path="/home">
										<GetHomePage />
									</Route>
									<Route path="/project/:projectId">
										<ProjectPage />
									</Route>
									<Route path="/login">
										<LoginPage />
									</Route>
									<Route path="/register">
										<RegisterPage />
									</Route>
									<Route path="/user/:userId">
										<UserPage />
									</Route>
									<Route path="/">
										<TitlePage />
									</Route>
								</Switch>
							</Router>
						</CssBaseline>
					</AuthUserContext.Provider>
				</IsLoggedInContext.Provider>
			</DarkModeContext.Provider>
		</ThemeProvider>
	);
}

export default App;
