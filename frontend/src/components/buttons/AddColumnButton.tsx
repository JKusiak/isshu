import { ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, SetStateAction, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
      buttonWrapper: {
        flexShrink: 0,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
      iconButton: {
            justifyContent: 'center',
            alignItems: 'center',
      },
      icon: {
            transform: 'scale(0.7)',
            color: theme.palette.secondary.main,
      },
      form: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
      },
      inputField: {
            width: 'auto',
            marginLeft: theme.spacing(1),
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
            <div className={classes.buttonWrapper} onClick={() => setAddMode(true)}>
                  <ClickAwayListener onClickAway={() => setAddMode(false)}>
                        <Card>
                              {addMode &&
                                    <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                                          <InputBase
                                                className={classes.inputField}
                                                required
                                                autoFocus
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