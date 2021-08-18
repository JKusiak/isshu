import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
      descriptionContainer: {
            maxWidth: '100%',
            marginBottom: theme.spacing(4),
      },
      descriptionTitle: {
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: theme.spacing(1),
      },
      descriptionText: {
            textAlign: 'start',
            "&:hover": {
                  cursor: 'pointer'
            }
      },
      formContainer: {
            width: '100%',
      },
      inputField: {
            width: '100%',
            height: '100%',
            "& .MuiOutlinedInput-root": {
                  height: '100%',
                  minHeight: '10vh',
                  "& fieldset": {
                        
                        height: 'auto',
                        borderColor: theme.palette.secondary.light,
                        borderRadius: '6px',
                        borderWidth: "1px",
                  },
                  "&.Mui-focused fieldset": {
                        height: 'auto',
                        borderColor: theme.palette.secondary.light,
                        borderRadius: '6px',
                        borderWidth: "1px",
                  },
                  alignItems: 'start',
            },
      },
}));


interface UpdateColumnButtonProps {
      tempDescription: string,
      setTempDescription: React.Dispatch<React.SetStateAction<string>>,
      permDescription: string,
      onSubmit: (e: any) => void,
}


const UpdateColumnButton: FC<UpdateColumnButtonProps> = (props) => {
      const classes = useStyles();
      const [updateMode, setUpdateMode] = useState<boolean>(false);  


      function handleSubmit(e: any) {
            if(updateMode) {
                  props.onSubmit(e);
            }  
            setUpdateMode(false);
      }


      return (
            <>
            <div className={classes.descriptionTitle}>Description</div>
            <ClickAwayListener onClickAway={handleSubmit}>
                  <div className={classes.descriptionContainer} onClick={() => setUpdateMode(true)}>
                        {updateMode &&
                              <form className={classes.formContainer} onSubmit={handleSubmit} autoComplete="off">
                                    <TextField
                                          className={classes.inputField}
                                          required
                                          autoFocus
                                          size="small"
                                          multiline={true}
                                          variant='outlined'
                                          name="issueDescription"
                                          id="issueDescription"
                                          value={props.tempDescription}
                                          autoComplete="issue-description"
                                          inputProps={{style: {fontSize: 15, padding:5}}}
                                          onChange={e => {
                                                props.setTempDescription(e.target.value);
                                          }}
                                    />
                              </form>     
                        }

                        {!updateMode &&
                              <div className={classes.descriptionText}>
                                    {props.permDescription? props.permDescription : 'Add description...'}
                              </div>
                        }
                  </div>
                  </ClickAwayListener>
            </>
      );
}


export default UpdateColumnButton;