import { ClickAwayListener, IconButton, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, SetStateAction, useState } from 'react';


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
      onSubmit: (e: React.SyntheticEvent<Element, Event>) => void,
      setColumnName: React.Dispatch<SetStateAction<string>>,
}


const AddColumnButton: FC<AddColumnButtonProps> = (props) => {
      const classes = useStyles();
      const [addMode, setAddMode] = useState<boolean>(false);


      function handleSubmit(e: any) {
            e.preventDefault();

            setAddMode(false);
            props.onSubmit(e);
      }


      return (
            <>
            <div onClick={() => setAddMode(true)}>
                  <ClickAwayListener onClickAway={() => setAddMode(false)}>
                        <Card>
                              {addMode &&
                                          <form onSubmit={handleSubmit} autoComplete="off">
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
                                                <IconButton type="submit">
                                                      <AddIcon className={classes.icon}/>
                                                </IconButton>
                                          </form>     
                              }
                              {!addMode &&
                                    <IconButton className={classes.iconButton}>
                                          <AddIcon className={classes.icon}/> 
                                    </IconButton>  
                              }
                        </Card>
                  </ClickAwayListener>
            </div>
            </>
      );
}

export default AddColumnButton;