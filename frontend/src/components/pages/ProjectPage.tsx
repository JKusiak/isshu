import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import GetAllUsers from "../functional/GetAllUsers";
import GetProject from "../functional/GetProject";
import MenuIcon from '@material-ui/icons/Menu';


const sidebarWidth = 270;

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            root: {
                  display: 'flex',
            },
            sidebar: {
                  [theme.breakpoints.up('sm')]: {
                        width: sidebarWidth,
                        flexShrink: 0,
                  },
            },
            pageContent: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1,
                  marginLeft: '2em',
                  marginRight: '2em',
            },
            menuButton: {
                  [theme.breakpoints.up("sm")]: {
                        display: "none"
                  },
                  marginTop: '1em',
                  marginBottom: '1em',
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
                              className={classes.menuButton}
                              color="inherit"
                              aria-label="open drawer"
                              edge="start"
                              onClick={() => {handleSidebarToggle()}}
                        >
                              <MenuIcon/>
                        </IconButton>
                        <div>
                              <GetProject/>
                        </div>
                  </div>
            </div>
      );
}

export default ProjectPage;