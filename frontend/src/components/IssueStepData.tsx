import { Card, CardContent, Checkbox, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { FC, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { INestedIssue, IStep } from '../types/ModelTypes';
import DeleteStepButton from './buttons/issueButtons/DeleteStepButton';
import { BoardReducerContext } from './functional/GetBoard';
import { ActionTypes } from './reducers/BoardReducer';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepCard: {
            width: '100%',
            flexShrink: 0,
            marginBottom: theme.spacing(1.5),
            backgroundColor: theme.palette.primary.light,
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
            },
            "& .MuiCardContent-root": {
                padding: theme.spacing(0.2),
            },
        },
        cardContent: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary.dark,
        },
        checkbox: {
            transform: 'scale(0.7)',
            color: theme.palette.secondary.main,
        },
    })
);


interface IssueStepProps {
    issue: INestedIssue,
	step: IStep,
	index: number,
    updateSteps: () => void,
}


const IssueStep: FC<IssueStepProps> = (props) => {
    const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);


    function handleCheck(checkedStep: IStep) {
        const updatedSteps = props.issue.steps.map((step: IStep) => {
            if(props.issue.steps.indexOf(step) === props.issue.steps.indexOf(checkedStep)) {
                step.isCompleted = !step.isCompleted;
            }
            return step;
        });
        
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
    <>
        <Draggable draggableId={`${props.issue.steps.indexOf(props.step)}`} index={props.index}>
			{(provided) => {
				return (
					<Card 
						className={classes.stepCard} 
						onClick={() => handleCheck(props.step)}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{
								...provided.draggableProps.style
						}}
					>
						<CardContent className={classes.cardContent}>
							<Checkbox
								className={classes.checkbox}
								checked={props.step.isCompleted}
							/>

							<Typography 
								component="h5" 
								variant="h5"
								style={{
									fontSize: '14px',
									textDecoration: props.step.isCompleted? 'line-through' : 'none',
									overflow: 'hidden',
								}}
							>
								{props.step.content}
							</Typography>
							
							<DeleteStepButton
								updateSteps={props.updateSteps}
								issue={props.issue}
								clickedStep={props.step}
							/>
						</CardContent>
					</Card>
				);
			}}
		</Draggable>
    </>
    );
}

export default IssueStep;