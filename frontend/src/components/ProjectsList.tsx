import { FC } from "react"
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";


interface ProjectListProps {
      projects: any;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.primary.main,
    },
    projectName: {
          
    }
  })
);


const ProjectsList: FC<ProjectListProps> = (props) => {
      const classes = useStyles();
      const [open, setOpen] = React.useState(false);
    
      const handleClick = () => {
        setOpen(!open);
      };

      function displayProjects() {
            if(props.projects.length > 0) {
                  return(props.projects.map((project: any, index: any) => {
                        return(
                              <>
                                    <ListItem button onClick={handleClick}>
                                          <ListItemText className={classes.projectName} primary={project.name} />
                                          <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="expand">
                                                      {open ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                          </ListItemSecondaryAction>
                                          
                                    </ListItem>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                                <ListItem>
                                                      <ListItemText primary={project.description} />
                                                </ListItem>
                                          </Collapse>
                                    
                              </>
                        );
                  }));
            } else {
                  return(
                        <h3>No projects yet</h3>
                  );
            }
      }
     
      return(
            <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.root}
            >
                  {displayProjects()}
            </List>
      );
}

export default ProjectsList;
