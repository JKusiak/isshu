import { IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext } from 'react';
import { INestedIssue, IStep } from '../../../types/ModelTypes';
import { BoardReducerContext } from '../../functional/GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';



const useStyles = makeStyles((theme: Theme) => createStyles({
	buttonWrapper: {
		marginLeft: 'auto',
	},	
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        transform: 'scale(0.7)',
        color: theme.palette.secondary.main,
    },
}));

interface DeleteStepButtonProps {
	issue: INestedIssue,
    clickedStep: IStep,
    updateSteps: () => void,
}


const DeleteStepButton: FC<DeleteStepButtonProps> = (props) => {
    const classes = useStyles();
    const { dispatch } = useContext(BoardReducerContext);


    function handleDelete() {
		const updatedSteps = props.issue.steps.filter(step => 
			props.issue.steps.indexOf(step) !== props.issue.steps.indexOf(props.clickedStep));

		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
					steps: updatedSteps,
			},
		};

		dispatch({type: ActionTypes.UpdateIssue, payload: payload});
		props.updateSteps();
    }


    return (
        <div className={classes.buttonWrapper}>
			<IconButton className={classes.iconButton} onClick={handleDelete}>
				<DeleteIcon className={classes.icon}/> 
			</IconButton>  
        </div>
    );
}

export default DeleteStepButton;