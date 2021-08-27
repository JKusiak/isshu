import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext } from "react";
import { DarkModeContext } from '../../App';
import TextLogo from '../../resources/logo/logo_text.svg';
import DarkTextLogo from '../../resources/logo/logo_text_darkmode.svg';
import ToProjectsButton from "../buttons/ToProjectsButton";
import RegisterModal from "../modals/RegisterModal";
import Footer from './Footer';


interface TitlePageProps {
	loggedIn: boolean,
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		// taking into account height of the navbar
		height: `calc(100vh - 68px)`,
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(4),
	},
	textLogo: {
		width: '35vw',
		minWidth: '250px',
		height: 'auto',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(10),
	}
}));

const TitlePage: FC<TitlePageProps> = (props) => {
	const classes = useStyles();
	const { darkMode } = useContext(DarkModeContext);


	return (
		<>
			<div className={classes.container}>
				<div className={classes.content}>
					<img
						className={classes.textLogo}
						src={darkMode ? DarkTextLogo : TextLogo}
						alt='logo of the website saying "Isshu - minimalistic bug tracker"'>
					</img>
					<div className={classes.buttons}>
						{!props.loggedIn &&
							<RegisterModal />
						}
						{props.loggedIn &&
							<ToProjectsButton />
						}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default TitlePage;