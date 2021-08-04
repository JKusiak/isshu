import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddBoardForm from '../functional/AddBoardForm';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/AddOutlined';
import Typography from '@material-ui/core/Typography';
import { ClickAwayListener } from '@material-ui/core';


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
      icon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      },
      
}));

interface AddBoardModalProps {
      fetchBoards: any,
}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
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
                  <Card className={classes.boardCard}>
                        <Typography component="h5" variant="h5">
                              {addMode && 
                                    <AddBoardForm fetchBoards={props.fetchBoards} setAddMode={setAddMode}/>
                              }
                              {!addMode && 
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