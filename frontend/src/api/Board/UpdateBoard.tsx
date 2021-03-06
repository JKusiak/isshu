import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateBoardNameButton from '../../components/Board/UpdateNameButton';
import { ActionTypes } from '../../reducers/BoardReducer';
import { BoardReducerContext } from './GetBoard';



interface UpdateBoardProps {
	boardName: string,
}


const UpdateBoard: FC<UpdateBoardProps> = (props) => {
	let { boardId } = useParams<{ boardId: string }>();
	const [tempBoardName, setTempBoardName] = useState(props.boardName);
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (tempBoardName === '') return;

		const board = {
			name: tempBoardName,
		}

		axios.post(`/boards/update/${boardId}`, board);

		dispatch({ type: ActionTypes.UpdateBoard, payload: tempBoardName });
	}


	return (
		<>
			<UpdateBoardNameButton
				tempBoardName={tempBoardName}
				setTempBoardName={setTempBoardName}
				permBoardName={props.boardName}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default UpdateBoard;