import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DeleteBoardForm from '../functional/DeleteBoardForm';
import { Button } from '@material-ui/core';


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
      deleteIcon: {
            fontSize: '40px',
            color: theme.palette.secondary.main,
      },
}));

interface DeleteBoardModalProps {
}


const DeleteBoardModal: FC<DeleteBoardModalProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = useState(false);


      const handleOpen = () => {
            setOpen(true);
      };


      const handleClose = () => {
            setOpen(false);
      };


      return (
            <>
            <Button>
                  <DeleteIcon className={classes.deleteIcon} onClick={handleOpen}/>
            </Button>
            
            
            <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={open}>
                        <div className={classes.paper}>
                              <DeleteBoardForm handleClose={handleClose}/>
                        </div>
                  </Fade>
            </Modal>
            </>
      );
}

export default DeleteBoardModal;