import { FC } from "react"
import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";


interface ProjectListProps {
      projects: any;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      color: "#000000"
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
                                          <ListItemText primary={project.name} />
                                          {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                          <ListItem button className={classes.nested}>
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
