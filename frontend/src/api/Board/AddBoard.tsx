import axios, { AxiosResponse } from 'axios';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddBoardButton from '../../components/Board/AddBoardButton';


interface AddBoardProps {
	fetchBoards: () => void,
}


const AddBoard: FC<AddBoardProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	const [boardName, setBoardName] = useState<string>('');
	const [addMode, setAddMode] = useState<boolean>(false);


	function createColumn(columnName: string, boardResponse: AxiosResponse) {
		const newBoardId = boardResponse.data._id;

		const requestBody = {
			columnName: columnName,
			boardId: newBoardId,
		}

		axios.post('/columns/add', requestBody);
	}


	function createDefaultColumns(boardResponse: AxiosResponse) {
		createColumn('TO DO', boardResponse);
		createColumn('IN PROGRESS', boardResponse);
		createColumn('DONE', boardResponse);
	}


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const board = {
			boardName: boardName,
			projectId: projectId,
		}

		axios.post('/boards/add', board)
			.then((res) => {
				createDefaultColumns(res);
				setAddMode(false);

				window.scroll({
					top: document.body.scrollHeight,
					left: 0,
					behavior: 'smooth'
				});
				props.fetchBoards();
			})
	}


	return (
		<>
			<AddBoardButton
				onSubmit={onSubmit}
				addMode={addMode}
				setAddMode={setAddMode}
				setBoardName={setBoardName}
			/>
		</>
	);
}

export default AddBoard;