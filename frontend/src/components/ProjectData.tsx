import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
  
      }
));


interface ProjectDataProps {
      project: any,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();


      return (
            <>
                  <div>
                        Anything here pls
                  </div>
                  <div>{ props.project.name }</div>
            </>
      );
}

export default ProjectData;