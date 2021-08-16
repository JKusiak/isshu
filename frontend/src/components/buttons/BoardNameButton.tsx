import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';


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


interface BoardNameButtonProps {
      tempBoardName: string,
      setTempBoardName: React.Dispatch<React.SetStateAction<string>>,
      permBoardName: string,
      onSubmit: (e: any) => void,
}


const BoardNameButton: FC<BoardNameButtonProps> = (props) => {
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
                                          variant='outlined'
                                          name="boardName"
                                          id="boardName"
                                          value={props.tempBoardName}
                                          autoComplete="board-name"
                                          onChange={e => {
                                                if(e.target.value !== '') {
                                                      props.setTempBoardName(e.target.value);
                                                } else {
                                                      props.setTempBoardName('Enter value');
                                                }
                                          }}
                                    />
                              </form>
                        }

                        {!updateMode &&
                              <div className={classes.nameText}>{props.permBoardName}</div>
                        }
                  </div>
            </ClickAwayListener>
      );
}


export default BoardNameButton;