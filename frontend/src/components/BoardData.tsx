import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useEffect, useState } from "react";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            boardWrapper: {

            }
      }
));


interface BoardDataProps {
      board: any,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      let history = useHistory();
      const [board, setBoard] = useState();

      useEffect(() => {
            setBoard(props.board);
      }, [props.board]);

      function getPreviousPath() {
            history.goBack();
      }


      return (
            <>
            <Button onClick={getPreviousPath}>
                  <BackIcon/>
            </Button>
            <div className={classes.boardWrapper}>
                  {console.log(board)}    
                  {board }
            </div>
            </>
      );
}

export default BoardData;