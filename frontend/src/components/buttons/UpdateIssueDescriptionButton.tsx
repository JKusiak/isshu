import { FC, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';


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
      description: string,
      setDescription: React.Dispatch<React.SetStateAction<string>>,
      onSubmit: (e: any) => void,
}


const UpdateColumnButton: FC<UpdateColumnButtonProps> = (props) => {
      const classes = useStyles();
      const [updateMode, setUpdateMode] = useState<boolean>(false);  


      function handleSubmit(e: any) {
            props.onSubmit(e);
            setUpdateMode(false);
      }


      return (
            <ClickAwayListener onClickAway={e =>handleSubmit(e)}>
                  <div onClick={() => setUpdateMode(true)}>
                        {updateMode && 
                              <form onSubmit={e =>handleSubmit(e)} autoComplete="off">
                                    <TextField
                                          className={classes.inputField}
                                          required
                                          autoFocus
                                          size="small"
                                          variant='outlined'
                                          name="issueDescription"
                                          id="issueDescription"
                                          placeholder={props.description}
                                          autoComplete="issue-description"
                                          inputProps={{style: {fontSize: 15, padding:5}}}
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      props.setDescription(e.target.value);
                                                } else {
                                                      props.setDescription('Add description of the issue');
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