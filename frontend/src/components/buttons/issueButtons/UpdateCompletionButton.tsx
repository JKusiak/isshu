import { Button, Card } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import { BoardReducerContext } from '../../functional/GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';


const useStyles = makeStyles((theme: Theme) => createStyles({
	cardWrapper: {
        display: 'flex',
		minWidth: '100px',
		height: '33px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
		width: '100%',
		textTransform: 'none',
		fontWeight: 'bold',
		"&:hover": {
			fontWeight: 'bold',
		}
    },
    text: {
		fontSize: '14px',
        color: theme.palette.secondary.dark,
    },
}));


interface UpdateCompletionButtonProps {
	issue: INestedIssue,
	updateCompletion: () => void,
}


const UpdateCompletionButton: FC<UpdateCompletionButtonProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);

	function handleSubmit() {
		const isFinished = !props.issue.isFinished;
		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				isFinished: isFinished,
			},
		};
		
		dispatch({type: ActionTypes.UpdateIssue, payload: payload});
		props.updateCompletion();
	}


	return (
		<>
		<Card className={classes.cardWrapper}>
			<Button className={classes.button} onClick={handleSubmit}>
				<div className={classes.text}>
					{props.issue.isFinished? 'Not finished' : 'Finished'}
				</div>
			</Button>  
		</Card>
		</>
	);
}


export default UpdateCompletionButton;