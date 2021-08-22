import { Card, CardContent, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { IBoard } from "../../types/ModelTypes";
import AddBoard from "../functional/AddBoard";
import GetProjectInfoBanner from "../functional/GetProjectInfoBanner";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      gridContainer: {
            display: 'grid',
            width: '75%',
            justifyContent: 'center',
            gap: theme.spacing(4),
            gridTemplateColumns: 'repeat(auto-fill, minMax(450px, 1fr))',
            margin: theme.spacing(4),
      },
      boardCard: {
            display: 'flex',
            minHeight: '300px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.primary.light,
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                  cursor: 'pointer',
                  boxShadow: theme.shadows[5],
            }
      },
      link: {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
      },
  })
);


interface BoardsGalleryProps {
      boards: [IBoard];
      fetchBoards: () => void;
}


const BoardsGallery: FC<BoardsGalleryProps> = (props) => {
      const classes = useStyles();
      const {url} = useRouteMatch();


      function displayBoards() {
            if(props.boards.length > 0) {
                  return(props.boards.map((board: IBoard) => {
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
                  <AddBoard fetchBoards={props.fetchBoards}/>
                  {displayBoards()}
            </div>
            </>
      );
}

export default BoardsGallery;
