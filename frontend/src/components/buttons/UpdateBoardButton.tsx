import { FC} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
      inputField: {
            "& .MuiOutlinedInput-root": {
                  "& fieldset": { 
                        padding: '0.5em 4em',
                        borderRadius: '10px',
                        borderColor: theme.palette.secondary.main,
                  }, 
                  "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.light,
                        borderWidth: "2px",
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


interface UpdateBoardButtonProps {
      boardName: string,
      setBoardName: React.Dispatch<React.SetStateAction<string>>,
      updateMode: boolean,
      setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>,
      onSubmit: (e: any) => void,
}


const UpdateBoardButton: FC<UpdateBoardButtonProps> = (props) => {
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
                                          variant='outlined'
                                          name="boardName"
                                          id="boardName"
                                          placeholder={props.boardName}
                                          autoComplete="board-name"
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      props.setBoardName(e.target.value);
                                                } else {
                                                      props.setBoardName('Enter value');
                                                }
                                          }}
                                    />
                              </form>
                        }

                        {!props.updateMode &&
                                    <div className={classes.nameText}>{props.boardName}</div>
                        }
                  </div>
            </ClickAwayListener>
      );
}


export default UpdateBoardButton;