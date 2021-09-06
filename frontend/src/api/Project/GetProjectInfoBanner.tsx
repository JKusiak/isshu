import axios from "axios";
import { FC, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectInfoBanner from "../../components/Project/ProjectInfoBanner";
import { ActionTypes, bannerReducer } from "../../reducers/BannerReducer";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedProject } from "../../types/ModelTypes";
import { getLoggedInUser } from "../User/GetLoggedInUser";



interface GetProjectInfoBannerProps {
	project: INestedProject,
}

const GetProjectInfoBanner: FC<GetProjectInfoBannerProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	const [projectBannerState, dispatch] = useReducer(bannerReducer, ProjectTemplate);
	const [file, setFile] = useState<string | Blob>('');
	const [imageUrl, setImageUrl] = useState<string | undefined>();
	const [imageExists, setImageExists] = useState<boolean>(false);
	const loggedInUser = getLoggedInUser();


	useEffect(() => {
		const initialReducerData = {
			_id: props.project._id,
			name: props.project.name,
			description: props.project.description,
			dateStart: props.project.dateStart,
			dateEnd: props.project.dateEnd,
			creator: props.project.creator,
		}
		dispatch({ type: ActionTypes.FetchData, payload: initialReducerData });
	}, [props.project])


	// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, [props.project]);


	// executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
		if (file !== '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();

		formData.append('organizationId', loggedInUser.organizationId);
		formData.append('directory', 'projects-covers');
		formData.append('imageUpload', file);

		axios.post(`/uploads/add/${props.project._id}`, formData)
			.then(() => {
				checkIfExists();
			}).catch((err) => {
				console.log(err);
			})
	}


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${loggedInUser.organizationId}%2fprojects-covers%2f${props.project._id}.jpg`;

		axios.get(`/uploads/get/${path}`)
			.then((resp) => {
				setImageExists(resp.data);
				if (resp.data) {
					// ?t= and timestamp added to trick cache into re-downloading image under same path
					const adjustedPath = path.replaceAll('%2f', '/') + '?t=' + new Date().getTime();
					setImageUrl(`http://localhost:5000/${adjustedPath}`);
				}
			}).catch((err) => {
				console.log(err);
			})
	}


	function updateProject() {
		axios.post(`/projects/update/${projectId}`, projectBannerState)
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			<ProjectInfoBanner
				projectBannerState={projectBannerState}
				dispatch={dispatch}
				updateProject={updateProject}
				imageExists={imageExists}
				bannerPath={imageUrl}
				setFile={setFile}
			/>
		</>
	);
}

export default GetProjectInfoBanner;