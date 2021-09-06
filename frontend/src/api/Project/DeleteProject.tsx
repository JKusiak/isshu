import axios from 'axios';
import { FC } from 'react';
import { useParams } from "react-router-dom";
import DeleteProjectModal from '../../components/Project/DeleteProjectModal';



interface DeleteProjectProps {
	handleSettingsClose: () => void,
}


const DeleteProject: FC<DeleteProjectProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();


	async function deleteProject() {
		await axios.delete(`/projects/delete/${projectId}`)
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			<DeleteProjectModal
				deleteProject={deleteProject}
				handleSettingsClose={props.handleSettingsClose}
			/>
		</>
	);
}

export default DeleteProject;