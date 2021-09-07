import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) => createStyles({
	nameText: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: '24px',
		color: theme.palette.secondary.main,
		"&:hover": {
			cursor: 'pointer'
		},
		overflow: 'hidden',
		marginBottom: theme.spacing(2),
	},
}));


interface NameProps {
	issue: INestedIssue,
	permName: string,
}


const NameText: FC<NameProps> = (props) => {
	const classes = useStyles();


	return (
		<div
			className={classes.nameText}
			style={{
				textDecoration: props.issue.isFinished ? 'line-through' : 'none',
			}}>
			{props.permName}
			{props.issue.isFinished && <CheckIcon />}
		</div>
	);
}


export default NameText;