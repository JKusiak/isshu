import { Hidden } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useContext } from "react";
import { DarkModeContext, LoggedInContext } from '../App';
import RegisterModal from "../components/RegisterModal";
import ToProjectsButton from "../components/ToProjectsButton";
import Footer from '../layout/Footer';
import TextLogo from '../resources/logo_text.svg';
import DarkTextLogo from '../resources/logo_text_darkmode.svg';
import TitleScreen1 from '../resources/title_screen1.png';
import TitleScreenMobile1 from '../resources/title_screen1_mobile.png';
import TitleScreen2 from '../resources/title_screen2.png';
import TitleScreenMobile2 from '../resources/title_screen2_mobile.png';
import TitleScreen3 from '../resources/title_screen3.png';
import TitleScreenMobile3 from '../resources/title_screen3_mobile.png';


const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
		alignItems: 'center',
		// taking into account height of the navbar
		height: `calc(100vh - 68px)`,
	},
	initialContent: {
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	textLogo: {
		width: '35vw',
		minWidth: '250px',
		height: 'auto',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(8),
	},
	advertsList: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('sm')]: {
			// necessary for placing elements at the ends of card
			"&>:nth-child(even)": {
				"& $advertTextWrapper": {
					marginLeft: 'auto',
				}
			},
			"&>:nth-child(odd)": {
				"& $advertTextWrapper": {
					marginRight: 'auto',
				}
			},
		},
	},
	advertBox: {
		display: 'flex',
		flexShrink: 0,
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			height: 'auto',
		},
		alignItems: 'center',
		height: '90vh',
		width: '80vw',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		border: 'none',
		elevation: 0,
	},
	advertTextWrapper: {
		display: 'flex',
		flexDirection: 'column',
		width: '30vw',
		minWidth: '280px',
	},
	advertHeader: {
		fontSize: '36px',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	advertText: {
		fontSize: '16px',
		textAlign: 'center',
		marginTop: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(4),
		},
	},
	cardImage: {
		maxWidth: '40vw',
		maxHeight: '40vh',
		borderRadius: '10px',
		boxShadow: theme.shadows[5],
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(16),
			maxWidth: '60vw',
			maxHeight: '60vh',
		},
	},
	actionCall: {
		fontSize: '42px',
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
		textAlign: 'center',
	}
}));


const TitlePage = () => {
	const classes = useStyles();
	const { darkMode } = useContext(DarkModeContext);
	const { isLoggedIn } = useContext(LoggedInContext);


	function buttonToCall() {
		return (
			<div className={classes.buttons}>
				{!isLoggedIn &&
					<RegisterModal />
				}
				{isLoggedIn &&
					<ToProjectsButton />
				}
			</div>
		)
	}


	return (
		<div className={classes.container}>
			<div className={classes.initialContent}>
				<img
					className={classes.textLogo}
					src={darkMode ? DarkTextLogo : TextLogo}
					alt='logo of the website saying "Isshu - minimalistic bug tracker"'>
				</img>
				{buttonToCall()}
			</div>
			<div className={classes.advertsList}>
				<div className={classes.advertBox}>
					<div className={classes.advertTextWrapper}>
						<div className={classes.actionCall}>
							For teams searching simplicity
						</div>
						<div className={classes.advertText}>
							Isshu offers only tools essential for project management, reducing unnecessary noise.
						</div>
					</div>
					<img
						className={classes.cardImage}
						src={window.innerWidth < 600 ? TitleScreenMobile1 : TitleScreen1}
						alt="Future app screenshot"
					/>
				</div>

				<div className={classes.advertBox}>
					<Hidden xsDown implementation="css">
						<img
							className={classes.cardImage}
							src={window.innerWidth < 600 ? TitleScreenMobile2 : TitleScreen2}
							alt="Future app screenshot"
						/>
					</Hidden>

					<div className={classes.advertTextWrapper}>
						<div className={classes.actionCall}>
							Track the essentials
						</div>
						<div className={classes.advertText}>
							All the crucial information, nothing more.
						</div>
					</div>

					<Hidden smUp implementation="css">
						<img
							className={classes.cardImage}
							src={window.innerWidth < 600 ? TitleScreenMobile2 : TitleScreen2}
							alt="Future app screenshot"
						/>
					</Hidden>
				</div>

				<div className={classes.advertBox}>
					<div className={classes.advertTextWrapper}>
						<div className={classes.actionCall}>
							Adjustable to your needs
						</div>
						<div className={classes.advertText}>
							Make the tool work best for what your team sees fit.
						</div>
					</div>
					<img
						className={classes.cardImage}
						src={window.innerWidth < 600 ? TitleScreenMobile3 : TitleScreen3}
						alt="Future app screenshot"
					/>
				</div>

			</div>
			<div className={classes.initialContent}>
				<div className={classes.actionCall}>Want to try it out?</div>
				{buttonToCall()}
			</div>
			<Footer />
		</div>
	);
}

export default TitlePage;