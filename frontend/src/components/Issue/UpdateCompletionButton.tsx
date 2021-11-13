import { Button, Card, useTheme } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext } from 'react';
import { BoardReducerContext } from '../../api/Board/GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';
import { INestedIssue } from '../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) => createStyles({
	cardWrapper: {
		display: 'flex',
		minWidth: '100px',
		height: '33px',
		backgroundColor: theme.palette.primary.light,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: '100%',
		textTransform: 'none',
		fontWeight: 'bold',
		fontSize: '14px',
		color: theme.palette.secondary.main,
		"&:hover": {
			fontWeight: 'bold',
		}
	},
}));


interface UpdateCompletionButtonProps {
	issue: INestedIssue,
	updateCompletion: () => void,
}


const UpdateCompletionButton: FC<UpdateCompletionButtonProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);
	const theme = useTheme();

	function handleSubmit() {
		const isFinished = !props.issue.isFinished;
		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				isFinished: isFinished,
			},
		};

		dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
		props.updateCompletion();
	}


	return (
		<>
			<Card className={classes.cardWrapper}>
				<Button className={classes.button} onClick={handleSubmit} style={{backgroundColor: props.issue.isFinished ? theme.palette.primary.dark : ''}}>
						Complete
				</Button>
			</Card>
		</>
	);
}


export default UpdateCompletionButton;