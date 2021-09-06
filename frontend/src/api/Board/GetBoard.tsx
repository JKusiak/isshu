import axios from "axios";
import { createContext, Dispatch, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useMountEffect } from "../../hooks/useMountEffect";
import BoardData from "../../pages/Project/Subpages/BoardPage";
import { Action, ActionTypes, boardContentReducer } from "../../reducers/BoardReducer";
import { NestedBoardTemplate } from "../../types/ModelContentTemplate";


// context for avoiding propagating function fetchBoard() for refreshing 
// the board content to child components
export const BoardReducerContext = createContext<{ boardState: any, dispatch: Dispatch<Action> }>({
	boardState: null,
	dispatch: () => null,
});


const GetBoard = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [boardState, dispatch] = useReducer(boardContentReducer, NestedBoardTemplate)


	useMountEffect(fetchBoard);


	function fetchBoard() {
		axios.get(`/boards/getContent/${boardId}`)
			.then(resp => {
				dispatch({ type: ActionTypes.FetchData, payload: resp.data });
				setIsLoaded(true);
			}).catch((err) => {
				console.log(err);
			});
	}


	function changeColumn(newColumnId: string, issueId: string) {
		const issueChanges = {
			columnId: newColumnId,
		}

		axios.post(`/issues/update/${issueId}`, issueChanges)
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			{isLoaded &&
				<BoardReducerContext.Provider value={{ boardState, dispatch }}>
					<BoardData board={boardState} changeColumn={changeColumn} />
				</BoardReducerContext.Provider>
			}
		</>
	);
}

export default GetBoard;