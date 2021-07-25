import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import { FC, useState } from "react";
import EditIcon from '@material-ui/icons/EditOutlined';
import { Box, ClickAwayListener, Grid, TextField } from "@material-ui/core";
//added temporary for development purposes
import Banner from '../resources/banners/banner.jpg';



const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            wrapper: {
                  display: 'grid',
                  width: '100%',
                  height: '100%',

            },
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
                        filter: 'blur(3px)',
                  },
            },
            nameForm: {
                  
            },
            editIcon: {
                  fontSize: 20,
                  "&:hover": {
                        cursor: 'pointer',
                  }
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
      const [isEditing, setIsEditing] = useState(false);
      const [projectDescription, setProjectDescription] = useState('');
      const [dateStart, setDateStart] = useState('');
      const [dateEnd, setDateEnd] = useState('');
      const [manager, setManager] = useState('');


      useEffect(() => {
            console.log('usedEffect');
            setProjectName(props.project.name);
            setProjectDescription(props.project.description);
            setDateStart(props.project.startDate);
            setDateEnd(props.project.endDate);
            setManager(props.project.creator);
      }, [props.project.name, 
            props.project.description, 
            props.project.startDate,
            props.project.endDate,
            props.project.creator]);


      function onSubmit(e: any) {
            e.preventDefault();

            let updatedProject = {
                  name: projectName,
                  description: projectDescription,
                  dateStart: dateStart,
                  dateEnd: dateEnd,
                  creator: manager,
            }
            setIsEditing(false);
            props.changeData(updatedProject);
      }

      
      function editClick() {
            setIsEditing(!isEditing);
      }


      function handleClickAway() {
            setIsEditing(false);
      }


      return (
            <>
            <Box className={classes.projectInfoBanner}>
                  <div className={classes.wrapper}>
                        <form className={classes.nameForm} noValidate autoComplete="off" onSubmit={onSubmit}>
                              <ClickAwayListener onClickAway={handleClickAway}>
                                    <Grid container spacing={1} alignItems="flex-end">
                                          <Grid item>
                                                <TextField 
                                                      id="input-with-icon-grid" 
                                                      disabled={!isEditing}
                                                      InputProps={{
                                                            disableUnderline: !isEditing,
                                                      }}
                                                      value={projectName || ''}
                                                      onChange={e => {setProjectName(e.target.value)}}
                                                />
                                          </Grid>
                                          <Grid item>                                               
                                                <EditIcon className={classes.editIcon} onClick={editClick}/>                                         
                                          </Grid>      
                                    </Grid>                              
                              </ClickAwayListener>
                        </form>
                  </div>
            </Box>

            </>
      );
}

export default ProjectData;