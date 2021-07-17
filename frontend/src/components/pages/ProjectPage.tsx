import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import GetAllUsers from "../functional/GetAllUsers";
import GetProject from "../functional/GetProject";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            pageContent: {
                  marginLeft: "15%"
            }
      }
));


interface ProjectPageProps {
}


const ProjectPage: FC<ProjectPageProps> = (props) => {
      const classes = useStyles();

      return (
            <>
            <GetAllUsers/>
            <div className={classes.pageContent}>
                  <GetProject/>
            </div>
            </>
      );
}

export default ProjectPage;