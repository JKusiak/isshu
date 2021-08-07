import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';
import UpdateBoardForm from '../functional/UpdateBoard';


const useStyles = makeStyles((theme: Theme) => createStyles({
      boardTitle: {
            justifySelf: 'center',
            alignSelf: 'center',
            fontSize: '36px',
            color: theme.palette.secondary.main,
            display: 'flex',
            justifyContent: 'center',
            "&:hover": {
                  cursor: 'pointer',
            }
      },
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
      wrongInput: {
            color: "#C62828",   
            textAlign: "center",
      },
      buttonIcon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      }
}));

interface AddBoardModalProps {
      boardName: string,
      setBoardName: React.Dispatch<React.SetStateAction<string>>,
      updateMode: boolean,
      setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>,
      onSubmit: (e: any) => void,
}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
      const classes = useStyles();
 

      return (
            <div onClick={() => props.setUpdateMode(true)}>
                  <ClickAwayListener onClickAway={props.onSubmit}>
                        <div className={classes.boardTitle}> 
                              {props.updateMode && 
                                    <form onSubmit={props.onSubmit} autoComplete="off">
                                          <TextField
                                                className={classes.inputField}
                                                required
                                                autoFocus
                                                variant='outlined'
                                                name="boardName"
                                                id="boardName"
                                                placeholder="Board name"
                                                autoComplete="board-name"
                                                onChange={e => {
                                                      props.setBoardName(e.target.value);
                                                }}
                                          />
                                    </form>
                              }
                              {!props.updateMode &&
                                          props.boardName
                              }
                        </div>
                  </ClickAwayListener>
            </div>

      );
}









export default AddBoardModal;