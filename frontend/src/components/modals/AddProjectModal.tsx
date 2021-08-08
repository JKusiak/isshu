import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddProjectIcon from '@material-ui/icons/AddBoxOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme: Theme) => createStyles({
      modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
      },
      paper: {
            width: '35vw',
            minWidth: '430px',
            height: 'auto',
            backgroundColor: theme.palette.primary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
      },
      icon: {
            fontSize: 25,
      },
      addProjectButton: {
            "&:hover": {
                  stroke: 'black',
                  strokeWidth: 0.2,
            }
      },
      header: {
            display: 'grid',
            justifyContent: 'center',
      },
      form: {
            width: '100%',
            marginTop: theme.spacing(5),
      },
      submit: {
            margin: theme.spacing(3, 0, 3),
            borderRadius: '10px',
            fontWeight: 600,
            "&:hover": {
                  background: theme.palette.action.hover,
            }
      },
      inputField: {
      "& .MuiOutlinedInput-root": {
            "& fieldset": { 
                  padding: '0.5em 4em',
                  borderRadius: '10px',
            }, 
            "&.Mui-focused fieldset": {
                  borderColor: theme.palette.secondary.light,
                  borderWidth: "2px",
            }
      },
      },
      wrongInput: {
            color: "#C62828",   
            textAlign: "center",
      }
}));


interface AddProjectModalProps {
      onSubmit: (e: React.SyntheticEvent) => void,
      isOpen: boolean,
      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
      isValid: boolean,
      setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
      startDate: Date | null,
      setStartDate: React.Dispatch<React.SetStateAction<Date | null>>,
      endDate: Date | null,
      setEndDate: React.Dispatch<React.SetStateAction<Date | null>>,
      errorText: string,
      setErrorText: React.Dispatch<React.SetStateAction<string>>,
      setProjectName: React.Dispatch<React.SetStateAction<string>>,
      setDescription: React.Dispatch<React.SetStateAction<string>>,
}


const AddProjectModal: FC<AddProjectModalProps> = (props) => {
      const classes = useStyles();
      
      const projectNameRegex = /^$|^[A-Za-z][a-z\s]*$/;


      return (
            <>
            <Tooltip title="Add project" aria-label="add project" placement="bottom" enterDelay={300} leaveDelay={100}>
                  <IconButton
                        className={classes.addProjectButton}
                        aria-label="add project" 
                        color="secondary"
                        onClick={() => props.setIsOpen(true)}
                  >
                        <AddProjectIcon className={classes.icon}/>
                  </IconButton>
            </Tooltip>
            <Modal
                  className={classes.modal}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={props.isOpen}
                  onClose={() => props.setIsOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.isOpen}>
                        <div className={classes.paper}>
                              <Typography className={classes.header} component="h1" variant="h4">
                                    Create project
                              </Typography>
                              <form className={classes.form} onSubmit={props.onSubmit} autoComplete="off">
                                    <Grid container spacing={3}>
                                          <Grid item xs={12}>
                                                <TextField
                                                      className={classes.inputField}
                                                      required
                                                      fullWidth
                                                      autoFocus
                                                      variant="outlined"
                                                      name="projectName"
                                                      id="projectName"
                                                      placeholder="Project Name"
                                                      autoComplete="project-name"
                                                      onChange={e => {
                                                            if (e.target.value.match(projectNameRegex)) {
                                                                  props.setProjectName(e.target.value);
                                                                  props.setIsValid(true);
                                                            } else {
                                                                  props.setErrorText("Name must contain only letters and spaces");
                                                                  props.setIsValid(false);
                                                            }
                                                      }}
                                                />
                                          </Grid>
                                          <Grid item xs={12}>
                                                <TextField
                                                      className={classes.inputField}
                                                      required
                                                      fullWidth
                                                      variant="outlined"
                                                      name="description"
                                                      id="description"
                                                      placeholder="Description"
                                                      autoComplete="description"
                                                      multiline={true}
                                                      onChange={e => {
                                                            props.setDescription(e.target.value);
                                                      }}
                                                />
                                          </Grid>
                                          <Grid item xs={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <KeyboardDatePicker
                                                            className={classes.inputField}
                                                            required
                                                            fullWidth
                                                            format='dd/MM/yyyy'
                                                            variant="inline"
                                                            name="startDate"
                                                            id="startDate"
                                                            helperText="Beginning date of the project"
                                                            value={props.startDate}
                                                            onChange={newDate => props.setStartDate(newDate)}
                                                      />
                                                </MuiPickersUtilsProvider>
                                          </Grid>
                                          <Grid item xs={6}>
                                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <KeyboardDatePicker
                                                            className={classes.inputField}
                                                            required
                                                            fullWidth
                                                            format='dd/MM/yyyy'
                                                            variant="inline"
                                                            name="endDate"
                                                            id="endDate"
                                                            helperText="Ending date of the project"
                                                            value={props.endDate}
                                                            onChange={newDate => props.setEndDate(newDate)}
                                                      />
                                                </MuiPickersUtilsProvider>
                                          </Grid>
                                    </Grid>

                                    {!props.isValid && <div className={classes.wrongInput}><p>{props.errorText}</p></div>}
                                    
                                    <Button
                                          className={classes.submit}
                                          fullWidth
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                    >
                                          Create
                                    </Button>
                              </form>
                        </div>
                  </Fade>
            </Modal>
            </>
      );
}

export default AddProjectModal;