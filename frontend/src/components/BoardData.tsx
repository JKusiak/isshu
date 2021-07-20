import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({

      }
));


interface BoardDataProps {
      board: any,
}


const BoardData: FC<BoardDataProps> = (props) => {
      const classes = useStyles();
      const location = useLocation();

      return (
            <>
                  {props.board.name}
            </>
      );
}

export default BoardData;