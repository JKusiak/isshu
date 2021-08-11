import React, { FC, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Button, Typography } from '@material-ui/core';


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
      deleteIcon: {
            fontSize: '40px',
            color: theme.palette.secondary.main,
      },
      header: {
            display: 'grid',
            justifyContent: 'center',
      },
      form: {
            display: 'flex',
            width: '100%',
            marginTop: theme.spacing(5),
      },
      button: {
            margin: theme.spacing(3, 2, 3),
            borderRadius: '10px',
            fontWeight: 600,
            background: theme.palette.primary.main,
            "&:hover": {
                  background: theme.palette.action.hover,
            }
      },
}));


interface DeleteBoardModalProps {
      deleteBoard: (e: React.MouseEvent) => void,
}


const DeleteBoardModal: FC<DeleteBoardModalProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = useState<boolean>(false);


      function handleOpen(e: React.MouseEvent) {
            e.preventDefault();
 
            setOpen(true);
      }


      function handleClose(e: React.MouseEvent) {
            e.preventDefault();
 
            setOpen(false);
      }



      return (
            <>
            <Button onClick={handleOpen}>
                  <DeleteIcon className={classes.deleteIcon} />
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
                              <Typography className={classes.header} component="h1" variant="h4">
                                    Delete board?
                              </Typography>
                              <div className={classes.form}>
                                    <Button
                                          className={classes.button}
                                          onClick={props.deleteBoard}
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

export default DeleteBoardModal;