import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import { FC, useState } from "react";
import { Box, ClickAwayListener, Grid, TextField } from "@material-ui/core";
//added temporary for development purposes
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
                        filter: 'blur(3.5px)',
                  },
            },
            gridWrapper: {
                  display: 'grid',
                  width: '100%',
                  height: '100%',
                  gridAutoColumns: '1fr',
                  gridTemplateColumns: '1fr 0.5fr 2fr 0.5fr 1fr',
                  gridTemplateRows: '1fr 2fr 0.5fr 0.5fr 0.5fr 0.5fr',
                  gridTemplateAreas:`
                        ". . projectName . settings"
                        ". description description description ."
                        ". . . . creator"
                        ". . . . dateStart"
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
                  justifySelf: 'center',
                  alignSelf: 'center',
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
                  color: theme.palette.primary.dark,
                  "&:hover": {
                        cursor: 'pointer',
                  }
            },
            fontColor: {
                  color: theme.palette.secondary.dark,
            },
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
      const [dateStart, setDateStart] = useState('');
      const [dateEnd, setDateEnd] = useState('');
      const [creator, setCreator] = useState('');
      const [isEditing, setIsEditing] = useState(false);


      useEffect(() => {
            // let projectCreator = `Creator: ${props.project.creator.name || ''} ${props.project.creator.surname || ''}`;
            
            setProjectName(props.project.name);
            setProjectDescription(props.project.description);
            // setCreator(projectCreator);
            setDateStart(props.project.startDate);
            setDateEnd(props.project.endDate);
      }, [props.project.name, 
            props.project.description, 
            props.project.startDate,
            props.project.endDate]);


      function onSubmit(e: any) {
            e.preventDefault();
            let updatedProject = {
                  name: projectName,
                  description: projectDescription,
                  dateStart: dateStart,
                  dateEnd: dateEnd,
            }

            setIsEditing(false);
            props.changeData(updatedProject);
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
            setIsEditing(false);
            onSubmit(e);
      }


      return (
            <>
            <ClickAwayListener onClickAway={handleClickAway}>
            <Box className={classes.projectInfoBanner}>
                  <div className={classes.gridWrapper}>
                        <form className={classes.nameForm} noValidate autoComplete="off" onSubmit={onSubmit}>
                              <TextField 
                                    id="project-name" 
                                    disabled={!isEditing}
                                    InputProps={{
                                          disableUnderline: true,
                                          className: classes.fontColor,
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
                                    id="project-description"
                                    multiline
                                    onKeyDown={handleEnterMultiline}
                                    disabled={!isEditing}
                                    fullWidth={true}
                                    InputProps={{
                                          disableUnderline: true,
                                    }}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    value={projectDescription || ''}
                                    onChange={e => {setProjectDescription(e.target.value)}}
                              />
                        </form>

                        <div className={classes.creator}>
                              <TextField 
                                    id="project-creator" 
                                    disabled={true}
                                    InputProps={{
                                          disableUnderline: true,
                                    }}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    value={creator || ''}
                              />
                        </div>

                        <form className={classes.dateStart}>
                              <TextField
                                    id="date-start"
                                    type="date"
                                    disabled={!isEditing}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    
                                    onChange={e => {setDateStart(e.target.value)}}
                              />
                        </form>

                        <form className={classes.dateEnd}>
                              <TextField
                                    id="date-end"
                                    type="date"
                                    disabled={!isEditing}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    value={dateEnd || ''}
                                    onChange={e => {setDateEnd(e.target.value)}}
                              />
                        </form>
                  </div>
            </Box>
            </ClickAwayListener>
            </>
      );
}

export default ProjectData;