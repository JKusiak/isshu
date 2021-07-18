import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            divStyle: {
                  fontSize: '20px',
            }
      }
));


interface ProjectDataProps {
      project: any,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();


      return (
            <>
                  <div className={classes.divStyle}>{ props.project.name }</div>
            </>
      );
}

export default ProjectData;