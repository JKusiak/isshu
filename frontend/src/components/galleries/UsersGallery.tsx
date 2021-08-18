import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, forwardRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            listSubtitle: {
                  fontSize: '24px',
                  textAlign: 'center',
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(2),
                  fontWeight: 600,
                  color: theme.palette.secondary.dark,
            },
            drawerPaper: {
                  marginTop: 70,
                  width: 270,
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: theme.shadows[2],
            },
            listItem: {  
                  '&:hover': {
                        backgroundColor: 'white',
                        boxShadow: theme.shadows[5],
                  }
            },
            nameLink: {
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                  '&:hover': {
                        '& *': {
                              fontWeight: 600
                        }
                  }
            },
      }),
);


interface UsersGalleryProps {
      contributors: [IUser],
      otherUsers: [IUser],
      mobileOpen: boolean,
      handleSidebarToggle: () => void,
      addProjectToUser: (userId: string) => void,
      removeProjectFromUser: (userId: string) => void,
      window?: () => Window,
}


const UsersGallery: FC<UsersGalleryProps> = forwardRef((props, ref) => {
      const classes = useStyles();
      const theme = useTheme();
      const {window} = props;


      const container = window !== undefined ? () => window().document.body : undefined;
   

      function handleButtonHover() {
           
      }


      function displayUsers(userType: [IUser]) {
            if(userType.length > 0) {
                  return(userType.map((user: IUser) => {
                        const fullName = `${user.name} ${user.surname}`;

                        if(userType === props.contributors) {
                              return(
                                    <Fragment key={user._id}>
                                          <ListItem className={classes.listItem}>
                                                <div>
                                                      <Link className={classes.nameLink} to={`/user/${user._id}`}>
                                                            <ListItemText primary={fullName}/>
                                                      </Link>
                                                      <ListItemSecondaryAction>
                                                            <IconButton 
                                                                  edge="end" 
                                                                  aria-label="remove-user" 
                                                                  onClick={() => props.removeProjectFromUser(user._id)}
                                                            >
                                                                  <DeleteIcon />
                                                            </IconButton>
                                                      </ListItemSecondaryAction>      
                                                </div>
                                          </ListItem> 
                                    </Fragment>
                              );
                        } else {
                              return(
                                    <Fragment key={user._id}>
                                          <ListItem className={classes.listItem}>
                                                <div>
                                                      <Link className={classes.nameLink} to={`/user/${user._id}`}>
                                                            <ListItemText primary={fullName}/>
                                                      </Link>
                                                      <ListItemSecondaryAction>
                                                            <IconButton 
                                                                  edge="end" 
                                                                  aria-label="add-user" 
                                                                  onClick={() => props.addProjectToUser(user._id)}
                                                                  onMouseOver={handleButtonHover}
                                                            >
                                                                  <AddIcon/>
                                                            </IconButton>
                                                      </ListItemSecondaryAction>
                                                </div>
                                          </ListItem>
                                    </Fragment>
                              );
                        }
                        
                  }));
            }
      }
      

      const sidebar = (
            <div>
                  <List>
                        <div className={classes.listSubtitle}>Contributors</div>
                        {displayUsers(props.contributors)}
                        <br/>
                        <Divider />
                        <div className={classes.listSubtitle}>Others</div>
                        {displayUsers(props.otherUsers)}
                  </List>
            </div>
      )


      return (
      <div>
            <CssBaseline />
            <nav>
                  <Hidden xsDown implementation="css">
                        <Drawer
                              classes={{
                                    paper: classes.drawerPaper,
                              }}
                              variant="permanent"
                              open
                        >

                              {sidebar}
                        </Drawer>
                  </Hidden>

                  <Hidden smUp implementation="css">
                        <Drawer
                              container={container}
                              variant="temporary"
                              anchor={theme.direction === "rtl" ? "right" : "left"}
                              open={props.mobileOpen}
                              onClose={props.handleSidebarToggle}
                              ModalProps={{
                                    keepMounted: true
                              }}
                        >
                              {sidebar}
                        </Drawer>
                  </Hidden>
            </nav>
      </div>
      );
});

export default UsersGallery;
