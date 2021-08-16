import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
      inputField: {
            width: '150px',
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
      nameText: {
            textAlign: 'center',
            "&:hover": {
                  cursor: 'pointer'
            }
      }
}));


interface UpdateColumnButtonProps {
      tempColumnName: string,
      setTempColumnName: React.Dispatch<React.SetStateAction<string>>,
      permColumnName: string,
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
                                          name="columnName"
                                          id="columnName"
                                          value={props.tempColumnName}
                                          autoComplete="column-name"
                                          inputProps={{style: {fontSize: 15, padding:5}}}
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      props.setTempColumnName(e.target.value);
                                                } else {
                                                      props.setTempColumnName('Enter value');
                                                }
                                          }}
                                    />
                              </form>
                        }

                        {!updateMode &&
                              <div className={classes.nameText}>{props.permColumnName}</div>
                        }
                  </div>
                  </ClickAwayListener>
      );
}


export default UpdateColumnButton;