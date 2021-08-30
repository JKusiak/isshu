import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { FC, useState } from "react";
import GetUsersGallery from "../functional/GetUsersGallery";
import ProjectData from "../ProjectData";


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
            },
            menuButton: {
                  color: theme.palette.secondary.main,
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
      const [mobileOpen, setMobileOpen] = useState<boolean>(false);

      const handleSidebarToggle = () => {
            setMobileOpen(!mobileOpen);
      };

      return (
            <div className={classes.root}>
                  <div className={classes.sidebar}>
                        <GetUsersGallery mobileOpen={mobileOpen} handleSidebarToggle={handleSidebarToggle}/>
                  </div>
                  <div className={classes.pageContent}>
                        <IconButton
                              className={classes.menuButton}
                              color="inherit"
                              aria-label="open drawer"
                              onClick={() => {handleSidebarToggle()}}
                        >
                              <MenuIcon/>
                        </IconButton>

                        <ProjectData/>
                  </div>
            </div>
      );
}

export default ProjectPage;