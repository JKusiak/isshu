import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import Divider from '@material-ui/core/Divider';
import { useState } from 'react';


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
      root: {
            display: 'flex',
            height: '100%',
            width: '250px',
            backgroundColor: '#ffffff',
      },
      listSubtitle: {
            fontSize: '1.7em',
            marginLeft: '2%',
      },
      toolbar: theme.mixins.toolbar,
      }),
);


interface UsersListProps {
      projectUsers: any,
      noProjectUsers: any,
      window?: () => Window,
}

const UsersList: FC<UsersListProps> = (props) => {
      const classes = useStyles();
      const [mobileOpen, setMobileOpen] = useState(false);


      const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
      };


      function displayUsers(userType: any) {
            if(userType.length > 0) {
                  return(userType.map((user: any) => {
                        const fullName = `${user.name} ` + `${user.surname}`;
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
      

      return (
      <div className={classes.root}>
            <CssBaseline />
            <div className={classes.toolbar} />
            <List>
                  <div className={classes.listSubtitle}>Project contributors:</div>
                  {displayUsers(props.projectUsers)}
                  <Divider />
                  <div className={classes.listSubtitle}>Other users:</div>
                  {displayUsers(props.noProjectUsers)}
            </List>
      </div>
      );
}

export default UsersList;