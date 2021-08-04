import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/AddOutlined';
import { ClickAwayListener, IconButton } from '@material-ui/core';
import AddColumnForm from '../functional/AddColumnForm';


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

interface AddColumnModalProps {
      fetchBoard: () => void,
}


const AddColumnModal: FC<AddColumnModalProps> = (props) => {
      const classes = useStyles();
      const [addMode, setAddMode] = useState(false);

      function handleClickAddBoard() {
            setAddMode(true);
      };
      
      function handleClickAway() {
            setAddMode(false);
      }


  return (
      <>
      <div onClick={handleClickAddBoard}>
            <ClickAwayListener onClickAway={handleClickAway}>
                  <Card >
                              {addMode && 
                                    <AddColumnForm setAddMode={setAddMode} fetchBoard={props.fetchBoard}/>
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

export default AddColumnModal;