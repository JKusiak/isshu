import Input from "@material-ui/core/Input";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import { FC, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Route, Switch} from 'react-router-dom';
import GetBoard from "./functional/GetBoard";
import GetBoardsGallery from "./functional/GetBoardsGallery";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            projectInfoWrapper: {
            
            },
      }
));


interface ProjectDataProps {
      project: any, 
      changeData: (newProjectData: any) => void,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();
      const [projectName, setProjectName] = useState();
      const [projectDescription, setProjectDescription] = useState();
      const [dateStart, setDateStart] = useState();
      const [dateEnd, setDateEnd] = useState();
      const [manager, setManager] = useState();


      useEffect(() => {
            console.log('updated states');
            // setProjectDescription(props.project.description);
            // setDateStart(props.project.startDate);
            // setDateEnd(props.project.endDate);
            // setManager(props.project.creator);
      }, []);


      function onSubmit() {
            let updatedProject = {
                  name: projectName,
                  description: projectDescription,
                  dateStart: dateStart,
                  dateEnd: dateEnd,
                  creator: manager,
            }

            props.changeData(updatedProject);
      }


      return (
            <>
            <div className={classes.projectInfoWrapper}>
                  <form noValidate autoComplete="off" onSubmit={onSubmit}>
                        <Input 
                              defaultValue={'123'} 
                              inputProps={{ 'aria-label': 'description' }}
                        />
                  </form>
            </div>
            </>
      );
}

export default ProjectData;