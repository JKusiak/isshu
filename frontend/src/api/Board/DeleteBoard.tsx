import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import DeleteBoardButton from '../../components/Board/DeleteBoardButton';


const DeleteBoard = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const { projectId } = useParams<{ projectId: string }>();
	let history = useHistory();


	function deleteBoard() {
		axios.delete(`/boards/delete/${boardId}`)
			.catch((err) => {
				console.log(err);
			});

		history.push(`/project/${projectId}`);
	}


	return (
		<>
			<DeleteBoardButton
				deleteBoard={deleteBoard}
			/>
		</>
	);
}

export default DeleteBoard;