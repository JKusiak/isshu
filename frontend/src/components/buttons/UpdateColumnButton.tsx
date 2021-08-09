import { FC} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';


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
      columnName: string,
      setColumnName: React.Dispatch<React.SetStateAction<string>>,
      updateMode: boolean,
      setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>,
      onSubmit: (e: any) => void,
}


const UpdateColumnButton: FC<UpdateColumnButtonProps> = (props) => {
      const classes = useStyles();
 

      return (
            <ClickAwayListener onClickAway={props.onSubmit}>
                  <div onClick={() => props.setUpdateMode(true)}>
                        {props.updateMode && 
                              <form onSubmit={props.onSubmit} autoComplete="off">
                                    <TextField
                                          className={classes.inputField}
                                          required
                                          autoFocus
                                          size="small"
                                          variant='outlined'
                                          name="columnName"
                                          id="columnName"
                                          placeholder={props.columnName}
                                          autoComplete="column-name"
                                          inputProps={{style: {fontSize: 15, padding:5}}}
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      props.setColumnName(e.target.value);
                                                } else {
                                                      props.setColumnName('Enter value');
                                                }
                                          }}
                                    />
                              </form>
                        }

                        {!props.updateMode &&
                              <div className={classes.nameText}>{props.columnName}</div>
                        }
                  </div>
                  </ClickAwayListener>
      );
}


export default UpdateColumnButton;