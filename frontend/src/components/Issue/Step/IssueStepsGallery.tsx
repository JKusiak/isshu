import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { BoardReducerContext } from '../../../api/Board/GetBoard';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { INestedIssue, IStep } from '../../../types/ModelTypes';
import AddStepButton from './AddStepButton';
import IssueStepData from './IssueStepData';



const useStyles = makeStyles((theme: Theme) => createStyles({
    headline: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    progressBar: {
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: theme.palette.secondary.main,
        }
    },
    progress: {
        textAlign: 'center',
        minWidth: '35px',
        marginLeft: theme.spacing(1),
        color: theme.palette.secondary.main
    },
})
);


interface IssueStepsGalleryProps {
    issue: INestedIssue,
    updateSteps: () => void,
}


const IssueStepsGallery: FC<IssueStepsGalleryProps> = (props) => {
    const classes = useStyles();
    const [progress, setProgress] = useState<number>(0);
    const { dispatch } = useContext(BoardReducerContext);


    useEffect(() => {
        const allSteps = props.issue.steps;
        const checkedSteps = allSteps.filter(step => step.isCompleted === true);
        const percentage = Math.floor((checkedSteps.length / allSteps.length) * 100);

        if (isNaN(percentage)) {
            setProgress(0);
        } else {
            setProgress(percentage);
        }
    }, [props.issue.steps]);


    function displaySteps() {
        return (props.issue.steps.map((step: IStep, index: number) => {
            return (
                <Fragment key={index}>
                    <IssueStepData
                        issue={props.issue}
                        step={step}
                        index={index}
                        updateSteps={props.updateSteps}
                    />
                </Fragment>
            );
        }));
    }


    function displayProgress() {
        return (
            <div className={classes.progressContainer}>

                <LinearProgress className={classes.progressBar} variant="determinate" value={progress} />

                <Typography className={classes.progress} variant="body2">
                    {`${progress}%`}
                </Typography>
            </div>
        )
    }


    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const reorderedSteps = reorderSteps(props.issue.steps, source.index, destination.index);
            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    steps: reorderedSteps,
                },
            };

            dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
            props.updateSteps();
        } else {
            return;
        }
    }


    function reorderSteps(steps: [IStep], startIndex: number, endIndex: number) {
        const [removed] = steps.splice(startIndex, 1);
        steps.splice(endIndex, 0, removed);
        return steps;
    }


    return (
        <>
            <Typography className={classes.headline} component="h5" variant="h5">
                Steps
            </Typography>
            
            {displayProgress()}

            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                <Droppable droppableId={props.issue._id}>
                    {provided => {
                        return (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {displaySteps()}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </DragDropContext>

            <AddStepButton
                updateSteps={props.updateSteps}
                issue={props.issue}
            />
        </>
    );
}

export default IssueStepsGallery;