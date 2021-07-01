import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC } from "react";
import { Link } from "react-router-dom";
import ProjectCover from '../resources/project_cover.png';


interface ProjectListProps {
      projects: any;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      gridContainer: {
            display: 'grid',
            gap: '1.2em',
            gridTemplateColumns: 'repeat(auto-fill, minMax(400px, 400px))',
            marginLeft: '10em',
            marginRight: '10em'
      },
      root: {
            display: 'flex',
            //change here to adjust infinite length of project displayed, but foto looks uglier
            height: 120,
            justifyContent: 'space-between',
            transition: 'all .12s linear',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
            "&:hover": {
                  boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2)',
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
      header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 680,
            marginTop: "1em",
            marginBottom: "1em",
            fontWeight: 'bold'
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


const ProjectsBoard: FC<ProjectListProps> = (props) => {
      const classes = useStyles();

      function displayProjects() {
            if(props.projects.length > 0) {
                  return(props.projects.map((project: any, index: any) => {
                        return(
                              <Link className={classes.link} to="/">
                                    <Card className={classes.root}>
                                                <div className={classes.details}>
                                                      <CardContent className={classes.link} component={Link} to='/'>
                                                            <Typography component="h5" variant="h5">
                                                                  {project.name}
                                                            </Typography>
                                                            <Typography variant="subtitle1" color="textSecondary">
                                                                  {project.description}
                                                            </Typography>
                                                      </CardContent>
                                                </div>
                                                <CardMedia
                                                      component={Link} to='/'
                                                      className={classes.image}
                                                      image={ProjectCover}
                                                      title="Project cover"
                                                />
                                    </Card>
                              </Link> 
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
            <Typography className={classes.header} component="h1" variant="h4">
                  Your projects
            </Typography>
            <div className={classes.gridContainer}>
                  {displayProjects()}
            </div>
            </>
      );
}

export default ProjectsBoard;
