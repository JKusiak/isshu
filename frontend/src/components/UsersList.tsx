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


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            listSubtitle: {
                  fontSize: '1.7em',
            },
            drawerPaper: {
                  marginTop: 70,
                  width: 270,
            }
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
                        return(
                              <Fragment key={user._id}>
                                    <ListItem>
                                          <ListItemText primary={fullName}/>
                                    </ListItem>
                              </Fragment>
                        );
                  }));
            }
      }
      

      const sidebar = (
            <div>
                  <List>
                        <div className={classes.listSubtitle}>Project contributors:</div>
                        {displayUsers(props.projectUsers)}
                        <Divider />
                        <div className={classes.listSubtitle}>Other users:</div>
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
