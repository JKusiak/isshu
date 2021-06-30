import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '../ButtonSpacing';
import RegisterForm from '../RegisterForm';

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
      homePageButton: {
            padding: '0.5em 4em',
            borderRadius: '10px',
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      }
}));

function RegisterModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
            className={classes.homePageButton}
            variant='contained'
            color='primary'
            mt={"2em"}
            size={'large'}
            onClick={handleOpen}> 
            Register
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
            <RegisterForm/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default RegisterModal;