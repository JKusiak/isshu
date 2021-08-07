import { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/AddOutlined';
import Typography from '@material-ui/core/Typography';
import { ClickAwayListener, IconButton, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
      boardCard: {
            display: 'flex',
            minHeight: '300px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                  boxShadow: theme.shadows[5],
                  cursor: 'pointer',
            },
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
      icon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      },
      
}));

interface AddBoardModalProps {
      onSubmit: any,
      addMode: any,
      setAddMode: any,
      setBoardName: any,
}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
      const classes = useStyles();
      

      return (
            <>
            <div onClick={() => props.setAddMode(true)}>
                  <ClickAwayListener onClickAway={() => props.setAddMode(false)}>
                        <Card className={classes.boardCard}>
                              <Typography component="h5" variant="h5">
                                    {props.addMode && 
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
                                                <IconButton type="submit">
                                                      <AddIcon className={classes.icon}/>
                                                </IconButton>
                                          </form>
                                    }
                                    {!props.addMode && 
                                          <AddIcon className={classes.icon}/>
                                    }
                              </Typography>
                        </Card>
                  </ClickAwayListener>
            </div>
            </>
      );
}

export default AddBoardModal;