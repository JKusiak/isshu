import React, { FC, useState } from 'react';
import AddProjectForm from '../functional/AddProjectForm';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddProjectIcon from '@material-ui/icons/AddBoxOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IconButton, Tooltip } from '@material-ui/core';
import AddBoardForm from '../functional/AddBoardForm';

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
            width: 26,
            height: 26,
      },
      homePageButton: {
            "&:hover": {
                  stroke: 'black',
                  strokeWidth: 0.2,
            }
      },
}));

interface AddBoardModalProps {
      open: boolean,
      handleOpen: () => void,
      handleClose: () => void,

}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
  const classes = useStyles();

  return (
      <>
      <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                  timeout: 500,
            }}
      >
        <Fade in={props.open}>
            <div className={classes.paper}>
                  <AddBoardForm handleClose={props.handleClose}/>
            </div>
        </Fade>
      </Modal>
      </>
  );
}

export default AddBoardModal;