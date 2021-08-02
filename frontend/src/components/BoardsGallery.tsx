import { Card, CardContent, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC, Fragment, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import GetProjectInfoBanner from "./functional/GetProjectInfoBanner";
import AddBoardModal from "./modals/AddBoardModal";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      gridContainer: {
            display: 'grid',
            width: '75%',
            justifyContent: 'center',
            gap: '2em',
            gridTemplateColumns: 'repeat(auto-fill, minMax(450px, 1fr))',
            margin: '3em 5em 3em 5em'
      },
      boardCard: {
            display: 'flex',
            minHeight: '300px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
            "&:hover": {
                  boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
            },
      },
      link: {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
      },
  })
);


interface BoardsGalleryProps {
      boards: any;
      fetchBoards: any;
}


const BoardsGallery: FC<BoardsGalleryProps> = (props) => {
      const classes = useStyles();
      const {url} = useRouteMatch();


      function displayBoards() {
            if(props.boards.length > 0) {
                  return(props.boards.map((board: any) => {
                        return(
                              <Fragment key={board._id}>
                                    <Link className={classes.link} to={`${url}/${board._id}`}>
                                          <Card className={classes.boardCard}>
                                                <CardContent className={classes.link} >
                                                      <Typography component="h5" variant="h5">
                                                            {board.name}
                                                      </Typography>
                                                </CardContent>
                                          </Card>
                                    </Link> 
                              </Fragment> 
                        );
                  }));
            }
      }
     
      return(
            <>
            <GetProjectInfoBanner/>

            <div className={classes.gridContainer}>
                  <AddBoardModal fetchBoards={props.fetchBoards}/>
                  {displayBoards()}
            </div>
            </>
      );
}

export default BoardsGallery;
