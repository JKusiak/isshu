import { Backdrop, Button, Card, CardContent, CardMedia, Fade, Modal, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC, Fragment, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import AddBoardModal from "./modals/AddBoardModal";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      gridContainer: {
            display: 'grid',
            justifyContent: 'center',
            gap: '1.2em',
            gridTemplateColumns: 'repeat(auto-fill, minMax(400px, 400px))',
            marginRight: '5em',
            marginLeft: '5em',
            marginBottom: '3em',
      },
      root: {
            display: 'flex',
            //change here to adjust infinite length of project displayed, but foto looks uglier
            height: 120,
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
            "&:hover": {
                  boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
            },
      },
      details: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 330,
            padding: '0.5em',
      },

      image: {
            flex: 'none',
            height: 120,
            width: 120,
            filter: 'blur(0.5px)'
      },
      
      link: {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
      },
      cardAction: {
            width: '100%',
            height: '100%',
      }
  })
);



interface BoardsGalleryProps {
      boards: any;
}


const BoardsGallery: FC<BoardsGalleryProps> = (props) => {
      const classes = useStyles();
      const {url} = useRouteMatch();
      const [open, setOpen] = useState(false);

      const handleOpenModal = () => {
        setOpen(true);
      };
    
      const handleCloseModal = () => {
        setOpen(false);
      };

      
      function displayAddBoard() {
            return(
                  <>
                  <div onClick={handleOpenModal}>
                        <Card className={classes.root}>
                                    <div className={classes.details}>
                                    <CardContent className={classes.link} >
                                          <Typography component="h5" variant="h5">
                                                <AddOutlinedIcon/>
                                          </Typography>
                                    </CardContent>
                              </div>
                        </Card>
                  </div>
                  <AddBoardModal open={open} handleOpen={handleOpenModal} handleClose={handleCloseModal}/>
                  </>
            );
      }
            
      

      function displayBoards() {
            if(props.boards.length > 0) {
                  return(props.boards.map((board: any) => {
                        return(
                              <Fragment key={board._id}>
                                    <Link className={classes.link} to={`${url}/${board._id}`}>
                                          <Card className={classes.root}>
                                                      <div className={classes.details}>
                                                            <CardContent className={classes.link} >
                                                                  <Typography component="h5" variant="h5">
                                                                        {board.name}
                                                                  </Typography>
                                                            </CardContent>
                                                      </div>
                                          </Card>
                                    </Link> 
                              </Fragment>
                              
                        );
                  }));
            }
      }
     
      return(
            <>
            <div className={classes.gridContainer}>
                  {displayAddBoard()}
                  {displayBoards()}
            </div>
            </>
      );
}

export default BoardsGallery;
