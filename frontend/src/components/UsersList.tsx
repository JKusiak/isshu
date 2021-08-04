import { forwardRef, Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { FC } from 'react';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/AddOutlined';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            listSubtitle: {
                  fontSize: '1.6em',
                  textAlign: 'center',
                  marginTop: '0.4em',
                  marginBottom: '0.4em',
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
                        boxShadow: theme.shadows[5],
                        '& *': {
                              fontWeight: 600
                        }
                  }
            },
            nameLink: {
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
            },           
            button: {
            },
            
      }),
);


interface UsersListProps {
      contributors: [],
      otherUsers: [],
      mobileOpen: boolean,
      handleSidebarToggle: () => void,
      addProjectToUser: (userId: string) => void,
      removeProjectFromUser: (userId: string) => void,
      window?: () => Window,
}


const UsersList: FC<UsersListProps> = forwardRef((props, ref) => {
      const classes = useStyles();
      const theme = useTheme();
      const {window} = props;


      const container = window !== undefined ? () => window().document.body : undefined;
   

      function handleButtonHover() {
           
      }


      function displayUsers(userType: any) {
            if(userType.length > 0) {
                  return(userType.map((user: any) => {
                        const fullName = `${user.name} ${user.surname}`;

                        if(userType === props.contributors) {
                              return(
                                    <Fragment key={user._id}>
                                          <ListItem className={classes.listItem}>
                                                <div>
                                                      <Link className={classes.nameLink} to={`/user/${user._id}`}>
                                                            <ListItemText primary={fullName}/>
                                                      </Link>
                                                      <ListItemSecondaryAction className={classes.button}>
                                                            <IconButton 
                                                                  className={classes.button} 
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
                                                                  className={classes.button} 
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

export default UsersList;
