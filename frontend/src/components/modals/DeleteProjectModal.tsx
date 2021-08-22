import { Button, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
      modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
      paper: {
            width: '330px',
            height: 'auto',
            backgroundColor: theme.palette.primary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
      },
      header: {
            display: 'grid',
            justifyContent: 'center',
            color: theme.palette.secondary.main,
      },
      form: {
            display: 'flex',
            width: '100%',
            marginTop: theme.spacing(5),
      },
      button: {
            margin: theme.spacing(3, 2, 3),
		borderRadius: '10px',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
			backgroundColor: theme.palette.primary.light,
		},
      },
}));

interface DeleteProjectModalProps {
      handleSettingsClose: () => void,
      deleteProject: (e: React.MouseEvent) => void,
}


const DeleteProjectModal: FC<DeleteProjectModalProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = useState<boolean>(false);


      const handleOpen = (e: React.SyntheticEvent) => {
            e.preventDefault();

            setOpen(true);
            props.handleSettingsClose();
      };


      const handleClose = (e: React.SyntheticEvent) => {
            e.preventDefault();

            setOpen(false);
            props.handleSettingsClose();
      };


      const handleDelete = (e: any) => {
            e.preventDefault();

            props.deleteProject(e);
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
                              <Typography className={classes.header} component="h1" variant="h4">
                                    Delete project?
                              </Typography>
                              <div className={classes.form}>
                                    <Button
                                          className={classes.button}
                                          onClick={handleDelete}
                                          fullWidth
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                    >
                                          Yes
                                    </Button>

                                    <Button
                                          className={classes.button}
                                          onClick={handleClose}
                                          fullWidth
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                    >
                                          No
                                    </Button>
                              </div>
                        </div>
                  </Fade>
            </Modal>
            </>
      );
}

export default DeleteProjectModal;