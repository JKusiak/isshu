import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = "15%";

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
      root: {
            display: 'flex',
            // marginTop: theme.mixins.toolbar
      },
      drawer: {
            [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            },
      },
      drawerPaper: {
            width: drawerWidth,
      },
      content: {
            flexGrow: 1,
            padding: theme.spacing(3),
      },
      toolbar: theme.mixins.toolbar,
      }),
);


interface Props {
      window?: () => Window;
      users: any,
}


export default function ResponsiveDrawer(props: Props) {
      const { window } = props;
      const classes = useStyles();
      const theme = useTheme();
      const [mobileOpen, setMobileOpen] = React.useState(false);

      const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
      };

  
      function displayUsers() {
            if(props.users.length > 0) {
                  return(props.users.map((user: any, index: any) => {
                        const fullName = `${user.name} ` + `${user.surname}`;
                        return(
                              <>
                              <ListItem button key={index}>
                                    <ListItemText primary={fullName}/>
                              </ListItem>
                              </>                                 
                        );
                  }));
            }
      }
      

  
      const drawer = (
      <div>
            <div className={classes.toolbar} />
            <List>
                  {displayUsers()}
            </List>
      </div>
      );

      const container = window !== undefined ? () => window().document.body : undefined;

      return (
      <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer} aria-label="users list">
            <Hidden smUp implementation="css">
            <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                  paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                  keepMounted: true,
                  }}
            >
                  {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                  classes={{
                  paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
            >
                  {drawer}
            </Drawer>
            </Hidden>
            </nav>
      </div>
      );
}