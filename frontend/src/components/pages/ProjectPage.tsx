import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useRef, useState } from "react";
import { createNull } from "typescript";
import GetAllUsers from "../functional/GetAllUsers";
import GetProject from "../functional/GetProject";


const sidebarWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            root: {
                  display: 'flex',
            },
            sidebar: {
                  width: sidebarWidth,
            },
            pageContent: {
                  marginLeft: sidebarWidth,
            },
            menuButton: {
                  [theme.breakpoints.up("sm")]: {
                        display: "none"
                  }
            },
      }
));


interface ProjectPageProps {
}


const ProjectPage: FC<ProjectPageProps> = (props) => {
      const classes = useStyles();
      const [mobileOpen, setMobileOpen] = useState(false);

      const handleSidebarToggle = () => {
            setMobileOpen(!mobileOpen);
      };

      return (
            <div className={classes.root}>
                  <div className={classes.sidebar}>
                        <GetAllUsers mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle}/>
                  </div>
                  <div className={classes.pageContent}>
                        <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              edge="start"
                              onClick={() => {handleSidebarToggle()}}
                              className={classes.menuButton}
                        >
                              123
                        </IconButton>  
                        <GetProject/>
                  </div>
            </div>
      );
}

export default ProjectPage;