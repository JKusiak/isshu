import { FC, useContext, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';
import { BoardReducerContext } from '../functional/GetBoard';
import { ActionTypes } from '../reducers/BoardReducer';


const useStyles = makeStyles((theme: Theme) => createStyles({
      inputField: {
            "& .MuiOutlinedInput-root": {
                  "& fieldset": { 
                        borderRadius: '10px',
                        borderColor: theme.palette.secondary.light,
                  }, 
                  "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.light,
                        borderWidth: "1px",
                  }
            },
      },
      descriptionText: {
            textAlign: 'center',
            "&:hover": {
                  cursor: 'pointer'
            }
      }
}));


interface UpdateColumnButtonProps {
      onSubmit: (e: any) => void,
      description: string,
}


const UpdateColumnButton: FC<UpdateColumnButtonProps> = (props) => {
      const classes = useStyles();
      const [updateMode, setUpdateMode] = useState<boolean>(false);  
      const dispatch = useContext(BoardReducerContext);


      function handleSubmit(e: any) {
            props.onSubmit(e);
            setUpdateMode(false);
      }


      return (
            <ClickAwayListener onClickAway={handleSubmit}>
                  <div onClick={() => setUpdateMode(true)}>
                        {updateMode && 
                              <form onSubmit={handleSubmit} autoComplete="off">
                                    <TextField
                                          className={classes.inputField}
                                          required
                                          autoFocus
                                          size="small"
                                          variant='outlined'
                                          name="issueDescription"
                                          id="issueDescription"
                                          placeholder={props.description || 'Add description of the issue'}
                                          autoComplete="issue-description"
                                          inputProps={{style: {fontSize: 15, padding:5}}}
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      dispatch({type: ActionTypes.UpdateIssue, payload: {name: e.target.value}});
                                                } else {
                                                      dispatch({type: ActionTypes.UpdateIssue, payload: {name: 'Add description of the issue'}});
                                                }
                                          }}
                                    />
                              </form>
                        }

                        {!updateMode &&
                              <div className={classes.descriptionText}>{props.description}123</div>
                        }
                  </div>
                  </ClickAwayListener>
      );
}


export default UpdateColumnButton;