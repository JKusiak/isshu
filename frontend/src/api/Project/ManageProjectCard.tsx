import axios from "axios";
import { FC, useEffect, useState } from "react";
import ProjectCard from "../../components/Project/ProjectCard";
import { IProject } from "../../types/ModelTypes";
import { getLoggedInUser } from "../User/GetLoggedInUser";


interface ManageGalleryProjectProps {
	project: IProject,
}


const ManageGalleryProject: FC<ManageGalleryProjectProps> = (props) => {
	const [imageExists, setImageExists] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const loggedInUser = getLoggedInUser();

	// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, [props.project]);


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${loggedInUser.organizationId}%2fprojects-covers%2f${props.project._id}.jpg`;
		
		axios.get(`/uploads/get/${path}`)
			.then((resp) => {
				setImageExists(resp.data);
				if (resp.data) {
					const adjustedPath = path.replaceAll('%2f', '/');
					setImageUrl(`http://localhost:5000/${adjustedPath}`);
				}
			}).catch((err) => {
				console.log(err);
			})
	}


	return (
		<>
			<ProjectCard
				project={props.project}
				imageExists={imageExists}
				imageUrl={imageUrl}
			/>
		</>
	);
}

export default ManageGalleryProject;