import { CardMedia, Hidden } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext } from "react";
import { DarkModeContext, LoggedInContext } from '../../App';
import Cover from '../../resources/covers/project_cover1.png';
import TextLogo from '../../resources/logo/logo_text.svg';
import DarkTextLogo from '../../resources/logo/logo_text_darkmode.svg';
import ToProjectsButton from "../buttons/ToProjectsButton";
import RegisterModal from "../modals/RegisterModal";
import Footer from './Footer';


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
				"& $cardImage": {
					marginLeft: 'auto',
				}
			},
		},
	},
	advertBox: {
		display: 'flex',
		flexShrink: 0,
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
		alignItems: 'center',
		height: '90vh',
		width: '70vw',
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
		marginTop: theme.spacing(1),
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(4),
		},
	},
	cardImage: {
		width: '250px',
		height: '250px',
	},
	actionCall: {
		fontSize: '42px',
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
		textAlign: 'center',
	}
}));


interface TitlePageProps {

}


const TitlePage: FC<TitlePageProps> = (props) => {
	const classes = useStyles();
	const { darkMode } = useContext(DarkModeContext);
	const { isLoggedIn, setLoggedIn } = useContext(LoggedInContext);


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
					<CardMedia
						className={classes.cardImage}
						image={Cover}
						title="Future app screenshot"
					/>
				</div>

				<div className={classes.advertBox}>
					<Hidden xsDown implementation="css">
						<CardMedia
							className={classes.cardImage}
							image={Cover}
							title="Future app screenshot"
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
						<CardMedia
							className={classes.cardImage}
							image={Cover}
							title="Future app screenshot"
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
					<CardMedia
						className={classes.cardImage}
						image={Cover}
						title="Future app screenshot"
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