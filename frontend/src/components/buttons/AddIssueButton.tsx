import { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { Card, ClickAwayListener, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
      formWrapper: {
            width: '100%',
      },
      container: {
            width: '100%',
      },
      buttonContainer: {
            display: 'grid',
            padding: '0.5em',
            gridTemplateColumns: '0.2fr 1fr',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                  cursor: 'pointer',
                  backgroundColor: theme.palette.action.hover,
            }
      },
      icon: {
            gridColumn: '1',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: '25px',
            color: theme.palette.secondary.light,
      },
      text: {
            gridColumn: '2',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: '15px',
            color: theme.palette.secondary.light,
      },
}));


interface AddIssueButtonProps {
      onSubmit: (e: React.SyntheticEvent<Element, Event>) => void,
      addMode: boolean,
      setAddMode: React.Dispatch<React.SetStateAction<boolean>>,
      setIssueDescription: React.Dispatch<React.SetStateAction<string>>,
}


const AddIssueButton: FC<AddIssueButtonProps> = (props) => {
      const classes = useStyles();


  return (
      <>
      <ClickAwayListener onClickAway={() =>  props.setAddMode(false)}>
            <div className={classes.container}>
                  {props.addMode &&
                        <Card className={classes.formWrapper}> 
                              <form onSubmit={props.onSubmit} autoComplete="off">
                                    <TextField
                                          required
                                          autoFocus
                                          fullWidth
                                          variant='outlined'
                                          name="issueDescription"
                                          id="issueDescription"
                                          placeholder="Enter description for the issue"
                                          autoComplete="issue-description"
                                          onChange={e => {
                                                props.setIssueDescription(e.target.value);
                                          }}
                                    />
                                    <div className={classes.buttonContainer} onClick={props.onSubmit}>
                                          <AddIcon className={classes.icon}/>
                                          <Typography className={classes.text} component='h6' variant='h6'>
                                                Create issue
                                          </Typography>
                                    </div>
                              </form>
                        </Card>
                  }
                  {!props.addMode &&  
                        <div className={classes.buttonContainer} onClick={(() => props.setAddMode(true))}>
                              <AddIcon className={classes.icon}/>
                              <Typography className={classes.text} component='h6' variant='h6'>
                                    Create issue
                              </Typography>
                        </div>
                  }
            </div>
      </ClickAwayListener>
      </>
  );
}

export default AddIssueButton;