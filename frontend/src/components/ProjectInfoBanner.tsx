import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import { FC, useState } from "react";
import { Box, ClickAwayListener, TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/EditOutlined';
import Banner from '../resources/banners/banner.jpg';
import DeleteProjectModal from "./modals/DeleteProjectModal";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            projectInfoBanner: {
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  height: '30vh',
                  marginBottom: '5em',
                  '&::before': {
                        content: '""',    // why for the love of god...
                        display: 'block',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: -1,
                        background: `url(${Banner})`,
                        backgroundSize: 'cover',
                        filter: 'blur(3px) brightness(75%)',
                  },
            },
            gridWrapper: {
                  display: 'grid',
                  width: '100%',
                  height: '100%',
                  gridTemplateColumns: '1fr 0.5fr 2fr 0.5fr 1fr',
                  gridTemplateRows: '1fr 0.5fr 1.5fr 0.5fr 0.5fr 0.5fr 0.5fr',
                  gridTemplateAreas:`
                        ". . . . settings"
                        ". . projectName . ."
                        ". description description description ."
                        ". description description description creator"
                        ". description description description dateStart"
                        ". . . . dateEnd"
                        ". . . . ."`
            },
            nameForm: {
                  gridArea: 'projectName',
                  justifySelf: 'center',
                  alignSelf: 'center',
            },
            settings: {
                  gridArea: 'settings',
                  justifySelf: 'end',
                  alignSelf: 'center',
                  marginRight: '1em',
            },
            description: {
                  gridArea: 'description',
                  justifySelf: 'center',
                  alignSelf: 'center',
            },
            creator: {
                  gridArea: 'creator',
                  justifySelf: 'end',
                  alignSelf: 'center',
                  marginRight: '1em',
            },
            dateStart: {
                  gridArea: 'dateStart',
                  justifySelf: 'end',
                  alignSelf: 'center',
                  marginRight: '1em',
            },
            dateEnd: {
                  gridArea: 'dateEnd',
                  justifySelf: 'end',
                  alignSelf: 'center',
                  marginRight: '1em',
            },
            editIcon: {
                  fontSize: 25,
                  marginRight: '0.5em',
                  color: 'white',
                  "&:hover": {
                        cursor: 'pointer',
                  }
            },
            fontColor: {
                  "& .MuiInputBase-root.Mui-disabled": {
                        color: 'white',
                  },
                  "& .MuiInputBase-root": {
                        color: 'rgba(0, 0, 0, 0.6)',
                  },
                  "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                        color: 'white',
                  },
            },
            nameStyle: {
                  fontSize: '3vw',
                  fontWeight: 600,
            },
            descriptionStyle: {
                  fontSize: '1.5vw',
                  fontWeight: 500,
            },
            creatorStyle: {
                  fontSize: '0.9vw',
                  fontWeight: 600,
            },
            dateStyle: {
                  fontSize: '0.9vw',
                  fontWeight: 500,
            }
      }
));


interface ProjectDataProps {
      project: any, 
      changeData: (newProjectData: any) => void,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();
      const [projectName, setProjectName] = useState('');
      const [projectDescription, setProjectDescription] = useState('');
      const [creator, setCreator] = useState({_id:'', name: '', surname: ''});
      const [dateStart, setDateStart] = useState<Date | null>(new Date());
      const [dateEnd, setDateEnd] = useState<Date | null>(new Date());
      const [isEditing, setIsEditing] = useState(false);


      useEffect(() => {
            setProjectName(props.project.name);
            setProjectDescription(props.project.description);
            setCreator(props.project.creator);
            setDateStart(props.project.dateStart);
            setDateEnd(props.project.dateEnd);
      }, [props.project.name, 
            props.project.description,
            props.project.creator,
            props.project.dateStart,
            props.project.dateEnd]);


      function onSubmit(e: any) {
            e.preventDefault();
            let updatedProject = {
                  name: projectName,
                  description: projectDescription,
                  creator: creator._id,
                  dateStart: dateStart,
                  dateEnd: dateEnd,
            }

            setIsEditing(false);
            props.changeData(updatedProject);
      }


      function displayCreator() {
            if(creator !== undefined && creator !== null) {
                  return(
                        <form className={classes.creator}>
                                    <TextField
                                          className={classes.fontColor}
                                          id="project-creator" 
                                          disabled={true}
                                          InputProps={{
                                                disableUnderline: true,
                                                classes: {
                                                      input: classes.creatorStyle,
                                                },
                                          }}
                                          inputProps={{min: 0, style: { textAlign: 'end' }}}
                                          value={`Creator: ${creator.name} ${creator.surname}`  || ''}
                                    />
                        </form>
                  )
            }
      }

      
      function handleEdit() {
            setIsEditing(!isEditing);
      }


      function handleEnterMultiline(e: any) {
            if(e.which === 13) {
                  onSubmit(e);
            }
      }


      function handleClickAway(e:any) {
            if(isEditing === true) {
                  setIsEditing(false);
                  onSubmit(e);
            }
      }


      return (
            <>
            <ClickAwayListener onClickAway={handleClickAway}>
            <Box className={classes.projectInfoBanner}>
                  <div className={classes.gridWrapper}>
                        <form className={classes.nameForm} noValidate autoComplete="off" onSubmit={onSubmit}>
                              <TextField
                                    className={classes.fontColor}
                                    id="project-name" 
                                    disabled={!isEditing}
                                    InputProps={{
                                          disableUnderline: true,
                                          classes: {
                                                input: classes.nameStyle,
                                          },
                                    }}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    value={projectName || ''}
                                    onChange={e => {setProjectName(e.target.value)}}
                              />
                        </form>

                        <div className={classes.settings}>
                              <EditIcon className={classes.editIcon} onClick={handleEdit}/>
                              <DeleteProjectModal />
                        </div>

                        <form className={classes.description} noValidate autoComplete="off" onSubmit={onSubmit}>
                              <TextField
                                    className={classes.fontColor}
                                    id="project-description"
                                    multiline
                                    onKeyDown={handleEnterMultiline}
                                    disabled={!isEditing}
                                    fullWidth={true}
                                    InputProps={{
                                          disableUnderline: true,
                                          classes: {
                                                input: classes.descriptionStyle,
                                          },
                                    }}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    value={projectDescription || ''}
                                    onChange={e => {setProjectDescription(e.target.value)}}
                              />
                        </form>

                        {displayCreator()}

                        <form className={classes.dateStart}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                          className={classes.fontColor}
                                          format='dd MMMM yyyy'
                                          variant="inline"
                                          id="date-start"
                                          disabled={!isEditing}
                                          InputProps={{
                                                disableUnderline: true,
                                                classes: {
                                                      input: classes.dateStyle,
                                                },
                                          }}
                                          inputProps={{min: 0, style: { textAlign: 'end' }}}
                                          value={dateStart}
                                          onChange={newDate => setDateStart(newDate)}
                                    />
                              </MuiPickersUtilsProvider>
                        </form>

                        <form className={classes.dateEnd}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                          className={classes.fontColor}
                                          format='dd MMMM yyyy'
                                          variant="inline"
                                          id="date-end"
                                          disabled={!isEditing}
                                          InputProps={{
                                                disableUnderline: true,
                                                classes: {
                                                      input: classes.dateStyle,
                                                },
                                          }}
                                          inputProps={{min: 0, style: { textAlign: 'end' }}}
                                          minDate={dateStart}
                                          value={dateEnd}
                                          onChange={newDate => setDateEnd(newDate)}
                                    />
                              </MuiPickersUtilsProvider>
                        </form>
                  </div>
            </Box>
            </ClickAwayListener>
            </>
      );
}

export default ProjectData;