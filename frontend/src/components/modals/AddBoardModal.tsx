import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddBoardForm from '../functional/AddBoardForm';
import Card from '@material-ui/core/Card';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) => createStyles({
      paper: {
            backgroundColor: theme.palette.primary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
      },
      modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
      icon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      },
      boardCard: {
            display: 'flex',
            minHeight: '300px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
            "&:hover": {
                  boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
            },
      },
      link: {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
      },
}));

interface AddBoardModalProps {
      boards: any,
      fetchBoards: any,
}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = useState(false);

      const handleOpenModal = () => {
            setOpen(true);
      };
      
      const handleCloseModal = () => {
            setOpen(false);
      };

  return (
      <>
      <div onClick={handleOpenModal}>
            <Card className={classes.boardCard}>
                  <Typography component="h5" variant="h5">
                        <AddOutlinedIcon className={classes.icon}/>
                  </Typography>
            </Card>
      </div>

      <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                  timeout: 500,
            }}
      >
        <Fade in={open}>
            <div className={classes.paper}>
                  <AddBoardForm boards={props.boards} fetchBoards={props.fetchBoards} handleClose={handleCloseModal}/>
            </div>
        </Fade>
      </Modal>
      </>
  );
}

export default AddBoardModal;