import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/AddOutlined';
import { Button, ClickAwayListener, Typography } from '@material-ui/core';
import AddIssueForm from '../functional/AddIssueForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
      container: {
            width: '90%',
      },
      buttonContainer: {
            display: 'grid',
            padding: '0.5em',
            gridTemplateColumns: '0.2fr 1fr',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                  cursor: 'pointer',
                  backgroundColor: theme.palette.action.hover,
            }
      },
      icon: {
            gridColumn: '1',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: '30px',
            color: theme.palette.secondary.light,
      },
      text: {
            gridColumn: '2',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: 15,
            color: theme.palette.secondary.light,
      },
      
}));

interface AddIssueModalProps {
      column: any,
      fetchBoard: any,
}


const AddIssueModal: FC<AddIssueModalProps> = (props) => {
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
      <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                  {addMode &&
                        <AddIssueForm column={props.column} fetchBoard={props.fetchBoard} setAddMode={setAddMode}/>
                  }
                  {!addMode &&  
                        <div className={classes.buttonContainer} onClick={handleClickAddBoard}>
                              <AddIcon className={classes.icon}/>
                              <Typography className={classes.text} component='h6' variant='h6'>
                                    Create issue
                              </Typography>
                        </div>
                  }
            </div>
      </ClickAwayListener>
      </>
  );
}

export default AddIssueModal;