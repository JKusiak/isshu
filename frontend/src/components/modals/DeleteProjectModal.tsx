import { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteProjectForm from '../functional/DeleteProjectForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
      paper: {
            backgroundColor: theme.palette.primary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
      },
      modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
}));

interface DeleteProjectModalProps {
      handleSettingsClose: any,
}


const DeleteProjectModal: FC<DeleteProjectModalProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = useState(false);


      const handleOpen = () => {
            setOpen(true);
            props.handleSettingsClose();
      };


      const handleClose = () => {
            setOpen(false);
      };


      return (
            <>
            <div onClick={handleOpen}>Delete project</div>
            
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
                        <DeleteProjectForm handleClose={handleClose}/>
                  </div>
            </Fade>
            </Modal>
            </>
      );
}

export default DeleteProjectModal;