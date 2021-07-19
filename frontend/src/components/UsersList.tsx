import React, { forwardRef, Fragment, useImperativeHandle } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { FC } from 'react';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
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
                  fontWeight: 600
            },
            drawerPaper: {
                  marginTop: 70,
                  width: 270,
            },
            listItem: {  
                  '&:hover': {
                        boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2)',
                  }
            },
            nameLink: {
                  color: theme.palette.secondary.dark,
                  textDecoration: 'none',
                  '&:hover': {
                        fontWeight: 700
                  }
            },
      }),
);


interface UsersListProps {
      projectUsers: any,
      noProjectUsers: any,
      mobileOpen: any,
      handleSidebarToggle: () => void,
      window?: () => Window,
}


const UsersList: FC<UsersListProps> = forwardRef((props, ref) => {
      const classes = useStyles();
      const theme = useTheme();
      const {window} = props;


      const container = window !== undefined ? () => window().document.body : undefined;


      function displayUsers(userType: any) {
            if(userType.length > 0) {
                  return(userType.map((user: any) => {
                        const fullName = `${user.name} ${user.surname}`;

                        if(userType == props.projectUsers) {
                              return(
                                    <Fragment key={user._id}>
                                          <ListItem className={classes.listItem}>
                                                <Link className={classes.nameLink} to={`/user/${user._id}`}>
                                                      <ListItemText primary={fullName}/>
                                                </Link>
                                                
                                                <ListItemSecondaryAction>
                                                      <IconButton edge="end" aria-label="remove-user">
                                                            <ClearOutlinedIcon />
                                                      </IconButton>
                                                </ListItemSecondaryAction>
                                          </ListItem> 
                                          
                                    </Fragment>
                              );
                        } else {
                              return(
                                    <Fragment key={user._id}>
                                          <ListItem className={classes.listItem}>
                                                <Link className={classes.nameLink} to={`/user/${user._id}`}>
                                                      <ListItemText primary={fullName}/>
                                                </Link>
                                                <ListItemSecondaryAction>
                                                      <IconButton edge="end" aria-label="add-user">
                                                            <AddOutlinedIcon/>
                                                      </IconButton>
                                                </ListItemSecondaryAction>
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
                        {displayUsers(props.projectUsers)}
                        <br/>
                        <Divider />
                        <div className={classes.listSubtitle}>Others</div>
                        {displayUsers(props.noProjectUsers)}
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
