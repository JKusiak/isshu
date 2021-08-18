import { Card, CardContent, Checkbox, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { INestedIssue, IStep } from '../../types/ModelTypes';
import AddStepButton from '../buttons/issueButtons/AddStepButton';
import DeleteStepButton from '../buttons/issueButtons/DeleteStepButton';
import { BoardReducerContext } from '../functional/GetBoard';
import { ActionTypes } from '../reducers/BoardReducer';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headline: {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        progressContainer: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 0,
        },
        progressBar: {
            width: '100%',
            flexGrow: 0,
        },
        progress: {
            minWidth: '35px',
            flexGrow: 0,
        },
        stepCard: {
            width: '100%',
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
            },
            "& .MuiCardContent-root": {
                padding: theme.spacing(1),
            },
        },
        cardContent: {
            display: 'flex',
            maxWidth: '100%',
            alignItems: 'center',
        },
        checkbox: {
            transform: 'scale(0.7)',
        },
        deleteStepButton: {
            marginLeft: 'auto',
        }
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

        if(isNaN(percentage)) {
            setProgress(0);
        } else {
            setProgress(percentage);
        }
    }, [props.issue.steps]);


    function handleCheck(checkedStep: IStep) {
        const updatedSteps = props.issue.steps.map(step => {
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

    
    function displaySteps() {
        if(props.issue.steps.length > 0) {
            return(props.issue.steps.map((step: IStep) => {
                return(
                    <Fragment key={step._id}>
                            <Card 
                                className={classes.stepCard} 
                                onClick={() => handleCheck(step)}
                            >
                                <CardContent className={classes.cardContent}>
                                    <Checkbox
                                        className={classes.checkbox}
                                        checked={step.isCompleted}
                                    />

                                    <Typography 
                                        component="h5" 
                                        variant="h5"
                                        style={{
                                            fontSize: '14px',
                                            textDecoration: step.isCompleted? 'line-through' : 'none',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {step.content}
                                    </Typography>
                                    
                                    <DeleteStepButton
                                        updateSteps={props.updateSteps}
                                        issue={props.issue}
                                        clickedStep={step}
                                    />
                                </CardContent>
                            </Card>
                    </Fragment>
                );
            }));
      }
    }


    function displayProgress() {
        return(
            <div className={classes.progressContainer}>
            <div className={classes.progressBar}>
                <LinearProgress color="secondary" variant="determinate" value={progress}/>
            </div>
            <Typography className={classes.progress} variant="body2" color="textSecondary">
                {`${progress}%`}
            </Typography>
            </div>
        )
    }


    return (
    <>
        <Typography className={classes.headline} component="h5" variant="h5">
            Steps
        </Typography>
        {displayProgress()}
        {displaySteps()}
        <AddStepButton 
            updateSteps={props.updateSteps}
            issue={props.issue}
        />
    </>
    );
}

export default IssueStepsGallery;