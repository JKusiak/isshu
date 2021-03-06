import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMountEffect } from "../../hooks/useMountEffect";
import BoardsGallery from "../../pages/Project/Subpages/BoardsGalleryPage";
import { NestedProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedProject } from "../../types/ModelTypes";


const GetBoardsGallery = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const [project, setProject] = useState<INestedProject>(NestedProjectTemplate);


	useMountEffect(fetchProject);


	function fetchProject() {
		axios.get(`/projects/getProgress/${projectId}`)
			.then((res) => {
				setProject(res.data);
			}).catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			<BoardsGallery project={project} fetchBoards={fetchProject} />
		</>
	);
}

export default GetBoardsGallery;