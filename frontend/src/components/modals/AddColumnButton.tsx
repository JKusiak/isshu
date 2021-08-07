import { FC, SetStateAction } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/AddOutlined';
import { ClickAwayListener, IconButton, TextField, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
      iconButton: {
            display: 'flex',
            minHeight: '35px',
            minWidth: '35px',
            justifyContent: 'center',
            alignItems: 'center',
      },
      icon: {
            fontSize: '30px',
            color: theme.palette.secondary.main,
      },
      
}));

interface AddColumnButtonProps {
      setColumnName: any
      addMode: any,
      setAddMode: any,
      onSubmit: any,
}


const AddColumnButton: FC<AddColumnButtonProps> = (props) => {
      const classes = useStyles();


      return (
            <>
            <div onClick={() => props.setAddMode(true)}>
                  <ClickAwayListener onClickAway={() => props.setAddMode(false)}>
                        <Card>
                              <Typography component="h5" variant="h5">
                                    {props.addMode &&
                                          // I have no clue why, bu the submit function call
                                          // has to come from button not form, otherwise not working
                                          <form onSubmit={() => {}} autoComplete="off">
                                                <TextField
                                                      required
                                                      autoFocus
                                                      variant='outlined'
                                                      name="columnName"
                                                      id="columnName"
                                                      placeholder="Column name"
                                                      autoComplete="column-name"
                                                      onChange={e => {
                                                            props.setColumnName(e.target.value);
                                                      }}
                                                />
                                                <IconButton onClick={props.onSubmit} type="submit">
                                                      <AddIcon className={classes.icon}/>
                                                </IconButton>
                                          </form>
                                    }
                                    {!props.addMode &&
                                          <IconButton className={classes.iconButton}>
                                                <AddIcon className={classes.icon}/> 
                                          </IconButton>  
                                    }
                              </Typography>
                        </Card>
                  </ClickAwayListener>
            </div>
            </>
      );
}

export default AddColumnButton;