import React, { FC } from 'react';
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
      setOpen: React.Dispatch<React.SetStateAction<boolean>>,
      open: boolean,
      handleGoBack: (e: React.MouseEvent) => void,
      handleDelete: (e: React.MouseEvent) => void,
}


const DeleteBoardModal: FC<DeleteBoardModalProps> = (props) => {
      const classes = useStyles();


      return (
            <>
            <Button onClick={() => props.setOpen(true)}>
                  <DeleteIcon className={classes.deleteIcon} />
            </Button>
            
            
            <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={props.open}
                  onClose={() => props.setOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.open}>
                        <div className={classes.paper}>
                              <Typography className={classes.header} component="h1" variant="h4">
                                    Delete board?
                              </Typography>
                              <div className={classes.form}>
                                    <Button
                                          className={classes.button}
                                          onClick={props.handleDelete}
                                          fullWidth
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                    >
                                          Yes
                                    </Button>

                                    <Button
                                          className={classes.button}
                                          onClick={props.handleGoBack}
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