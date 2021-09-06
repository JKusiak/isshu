import axios from 'axios';
import { useParams } from "react-router-dom";
import DeleteBoardModal from '../../components/Board/DeleteModal';



const DeleteBoard = () => {
	const { boardId } = useParams<{ boardId: string }>();


	function deleteBoard() {
		axios.delete(`/boards/delete/${boardId}`)
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			<DeleteBoardModal
				deleteBoard={deleteBoard}
			/>
		</>
	);
}

export default DeleteBoard;