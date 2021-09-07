import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) => createStyles({
	creatorContainer: {
		fontSize: '16px',
		marginBottom: theme.spacing(4),
	},
	creatorTitle: {
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
	},
	creatorName: {
		marginLeft: theme.spacing(2),
		color: theme.palette.secondary.main,
	}
}));


interface CreatorProps {
	issue: INestedIssue,
}


const CreatorText: FC<CreatorProps> = (props) => {
	const classes = useStyles();


	return (
		<div className={classes.creatorContainer}>
			<span className={classes.creatorTitle}>Creator</span>
			<span className={classes.creatorName}>
				{`${props.issue.creator.name} ${props.issue.creator.surname}`}
			</span>
		</div>
	);
}


export default CreatorText;