import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
// hardcoded now just for aesthetic purposes during development <3
import ProjectCover1 from '../resources/covers/project_cover1.png';
import ProjectCover2 from '../resources/covers/project_cover2.png';
import ProjectCover3 from '../resources/covers/project_cover3.png';
import ProjectCover4 from '../resources/covers/project_cover4.png';
import ProjectCover5 from '../resources/covers/project_cover5.png';
import ProjectCover6 from '../resources/covers/project_cover6.png';
import ProjectCover7 from '../resources/covers/project_cover7.png';
import { IProject } from "../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      gridContainer: {
            display: 'grid',
            justifyContent: 'center',
            gap: '1.2em',
            gridTemplateColumns: 'repeat(auto-fill, minMax(400px, 400px))',
            marginRight: '5em',
            marginLeft: '5em',
            marginBottom: '3em',
      },
      root: {
            display: 'flex',
            //change here to adjust infinite length of project displayed, but foto looks uglier
            height: 120,
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                  boxShadow: theme.shadows[5],
            }
      },
      details: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 330,
            padding: '0.5em',
      },

      image: {
            flex: 'none',
            height: 120,
            width: 120,
            filter: 'blur(0.5px)'
      },
      
      link: {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
      },
      cardAction: {
            width: '100%',
            height: '100%',
      }
  })
);


function shuffleProjectCover() {
      const coversArr = [ProjectCover1, ProjectCover2, ProjectCover3, ProjectCover4, ProjectCover5, ProjectCover6, ProjectCover7];

      return coversArr[Math.floor(Math.random() * coversArr.length)];
}


interface ProjectListProps {
      projects: [IProject];
}


const ProjectsGallery: FC<ProjectListProps> = (props) => {
      const classes = useStyles();
      const {url} = useRouteMatch();

      function displayProjects() {
            if(props.projects.length > 0) {
                  return(props.projects.map((project: IProject) => {
                        return(
                              <Fragment key={project._id}>
                                    <Link className={classes.link} to={`${url}/${project._id}`}>
                                          <Card className={classes.root}>
                                                      <div className={classes.details}>
                                                            <CardContent className={classes.link} >
                                                                  <Typography component="h5" variant="h5">
                                                                        {project.name}
                                                                  </Typography>
                                                                  <Typography variant="subtitle1" color="textSecondary">
                                                                        {project.description}
                                                                  </Typography>
                                                            </CardContent>
                                                      </div>
                                                      <CardMedia

                                                            className={classes.image}
                                                            image={shuffleProjectCover()}
                                                            title="Project cover"
                                                      />
                                          </Card>
                                    </Link> 
                              </Fragment>
                              
                        );
                  }));
            } else {
                  return(
                        <h3>No projects yet</h3>
                  );
            }
      }
     
      return(
            <>
            <div className={classes.gridContainer}>
                  {displayProjects()}
            </div>
            </>
      );
}

export default ProjectsGallery;
