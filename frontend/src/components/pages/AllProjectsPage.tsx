import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import GetProjectsGallery from "../functional/GetProjectsGallery";


interface ProjectsPageProps {

}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 680,
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
            fontWeight: 'bold',
            color: theme.palette.secondary.main,
      },
  }
));

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
      const classes = useStyles();
      
      return (
      <>
            <Typography className={classes.header} component="h1" variant="h4">
                  Your projects
            </Typography>
            <GetProjectsGallery/>
      </>
      );
}

export default ProjectsPage;