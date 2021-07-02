import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react"
import GetProjectsBoard from "../functional/GetProjectsBoard";

interface ProjectsPageProps {

}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 680,
            marginTop: "1em",
            marginBottom: "1em",
            fontWeight: 'bold'
      },
  }))

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
      const classes = useStyles();
      
      return (
      <>
            <Typography className={classes.header} component="h1" variant="h4">
                  Your projects
            </Typography>
            <GetProjectsBoard/>
      </>
      );
}

export default ProjectsPage;