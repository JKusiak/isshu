import { ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, useContext, useState } from 'react';
import { BoardReducerContext } from '../../../api/Board/GetBoard';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { INestedIssue } from '../../../types/ModelTypes';



const useStyles = makeStyles((theme: Theme) => createStyles({
    buttonWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.palette.primary.light,
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {
        transform: 'scale(0.7)',
        color: theme.palette.secondary.main,
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        color: theme.palette.secondary.main,
    }
}));

interface AddStepButtonProps {
    issue: INestedIssue,
    updateSteps: () => void,
}


const AddStepButton: FC<AddStepButtonProps> = (props) => {
    const classes = useStyles();
    const [addMode, setAddMode] = useState<boolean>(false);
    const [stepContent, setStepContent] = useState<string>('');
    const { dispatch } = useContext(BoardReducerContext);


    function handleSubmit(e: any) {
        e.preventDefault();

        if (stepContent !== '') {
            const newStep = {
                content: stepContent,
                isCompleted: false,
            };

            const updatedSteps = [...props.issue.steps, newStep];

            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    steps: updatedSteps,
                },
            };

            dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
            props.updateSteps();
            setStepContent('');
        }
        setAddMode(false);
    }


    return (
        <>
            <div className={classes.buttonWrapper} onClick={() => setAddMode(true)}>
                <ClickAwayListener onClickAway={() => setAddMode(false)}>
                    <Card className={classes.card}>
                        {addMode &&
                            <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                                <InputBase
                                    className={classes.inputField}
                                    required
                                    autoFocus
                                    name="setContent"
                                    id="stepContent"
                                    placeholder="Step content"
                                    autoComplete="step-content"
                                    onChange={e => {
                                        setStepContent(e.target.value);
                                    }}
                                />
                                <IconButton type="submit">
                                    <AddIcon className={classes.icon} />
                                </IconButton>
                            </form>
                        }
                        {!addMode &&
                            <IconButton className={classes.iconButton}>
                                <AddIcon className={classes.icon} />
                            </IconButton>
                        }
                    </Card>
                </ClickAwayListener>
            </div>
        </>
    );
}

export default AddStepButton;