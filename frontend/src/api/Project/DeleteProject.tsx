import axios from 'axios';
import { FC } from 'react';
import { useHistory, useParams } from "react-router-dom";
import ConfirmationModal from '../../components/Commons/ConfirmationModal';



interface DeleteProjectProps {
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const DeleteProject: FC<DeleteProjectProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	let history = useHistory();


	function deleteProject() {
		axios.delete(`/projects/delete/${projectId}`)
			.catch((err) => {
				console.log(err);
			});
		history.push(`/home/projects`);
	}


	return (
		<>
			<ConfirmationModal
				handleConfirm={deleteProject}
				open={props.open}
				setOpen={props.setOpen}
			/>
		</>
	);
}

export default DeleteProject;