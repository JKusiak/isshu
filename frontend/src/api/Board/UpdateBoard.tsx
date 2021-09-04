import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardNameButton from '../../components/Board/BoardNameButton';
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

		axios.post(`http://localhost:5000/boards/update/${boardId}`, board, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})

		dispatch({ type: ActionTypes.UpdateBoard, payload: tempBoardName });
	}


	return (
		<>
			<BoardNameButton
				tempBoardName={tempBoardName}
				setTempBoardName={setTempBoardName}
				permBoardName={props.boardName}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default UpdateBoard;