import { createStyles, Link, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
	footerContainer: {
		marginTop: 'auto',
		display: 'flex',
		justifyContent: 'center',
		fontSize: '16px',
		padding: theme.spacing(2),
	},
	link: {
		color:theme.palette.secondary.main,
		"&:hover": {
			textDecoration: 'none',
			fontWeight: 'bold',
		}
	}
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<>
			<footer className={classes.footerContainer}>
				Made with 🖤 by
				<Link className={classes.link} href="https://www.linkedin.com/in/juliusz-kusiak-22992520a/">
					&nbsp;Juliusz Kusiak
				</Link>
			</footer>
		</>
	)
}

export default Footer;