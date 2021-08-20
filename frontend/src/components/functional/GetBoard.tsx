import axios from "axios";
import { createContext, Dispatch, FC, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { NestedBoardTemplate } from "../../types/ModelContentTemplate";
import BoardData from "../BoardData";
import { Action, ActionTypes, boardContentReducer } from "../reducers/BoardReducer";


interface GetBoardProps {
}

// context for avoiding propagating function fetchBoard() for refreshing 
// the board content to child components
export const BoardReducerContext = createContext<{boardState: any, dispatch: Dispatch<Action>}>({
      boardState: null, 
      dispatch: () => null,
});


const GetBoard: FC<GetBoardProps> = (props) => {
      const { boardId } = useParams<{ boardId: string }>();
      const [isLoaded, setIsLoaded] = useState<boolean>(false);
      const [boardState, dispatch] = useReducer(boardContentReducer, NestedBoardTemplate)
      

      useEffect(() => {
            fetchBoard();
      }, []);


      function fetchBoard() {
            axios.get(`http://localhost:5000/boards/getContent/${boardId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  dispatch({type: ActionTypes.FetchData, payload: resp.data});
                  setIsLoaded(true);
            }).catch((err) => {
                  console.log(err);
            });
      }


      function changeColumn(newColumnId: string, issueId: string) {
            const issueChanges = {
                  columnId: newColumnId,
            }

            axios.post(`http://localhost:5000/issues/update/${issueId}`, issueChanges, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });
      }


      return (
            <>
            {isLoaded &&
                  <BoardReducerContext.Provider value={{boardState, dispatch}}>
                        <BoardData board={boardState} changeColumn={changeColumn}/>
                  </BoardReducerContext.Provider> 
            }
            </>
      );
}

export default GetBoard;