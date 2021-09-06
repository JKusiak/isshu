import { IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import { useHistory, useParams } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => createStyles({
	backButton: {
		padding: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			paddingRight: 0,
			paddingLeft: 0,
		},
	},
	backIcon: {
		transform: 'scale(2.5)',
		color: theme.palette.secondary.main,
		[theme.breakpoints.down('xs')]: {
			transform: 'scale(1.8)',
		},
	},
}));


const GoBackButton = () => {
	const classes = useStyles();
	const { projectId } = useParams<{ projectId: string }>();
	const history = useHistory();


	function handleGoBack() {
		history.push(`/project/${projectId}`);
	}


	return (
		<IconButton className={classes.backButton} onClick={handleGoBack}>
			<BackIcon className={classes.backIcon} />
		</IconButton>
	);
}


export default GoBackButton;