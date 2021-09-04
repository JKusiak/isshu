import { createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import { useContext } from "react";
import { DarkModeContext } from "../App";

const useStyles = makeStyles((theme: Theme) => createStyles({
	footerContainer: {
		marginTop: 'auto',
		display: 'flex',
		justifyContent: 'center',
		fontSize: '16px',
		color: theme.palette.secondary.main,
		padding: theme.spacing(2),
	},
	link: {
		color: theme.palette.secondary.main,
		"&:hover": {
			textDecoration: 'none',
			fontWeight: 'bold',
		}
	}
}));

const Footer = () => {
	const classes = useStyles();
	const { darkMode } = useContext(DarkModeContext);

	return (
		<>
			<footer className={classes.footerContainer}>
				Made with {darkMode ? <span>&nbsp;🤍&nbsp;</span> : <span>&nbsp;🖤&nbsp;</span>} by
				<Link className={classes.link} href="https://www.linkedin.com/in/juliusz-kusiak-22992520a/">
					&nbsp;Juliusz Kusiak
				</Link>
			</footer>
		</>
	)
}

export default Footer;