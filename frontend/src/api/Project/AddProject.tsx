import axios, { AxiosResponse } from 'axios';
import React, { FC, useContext, useReducer, useState } from 'react';
import { useHistory } from "react-router-dom";
import { AuthUserContext } from '../../App';
import AddProjectModal from '../../components/Project/AddProjectModal/AddProjectModal';
import { projectReducer } from '../../reducers/ProjectReducer';
import { ProjectTemplate } from '../../types/ModelContentTemplate';


interface AddProps {
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const AddProject: FC<AddProps> = (props) => {
	let history = useHistory();
	const [projectState, dispatch] = useReducer(projectReducer, ProjectTemplate);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [errorText, setErrorText] = useState<string>('');
	const { loggedInUser } = useContext(AuthUserContext);


	function addProjectToUser(res: AxiosResponse) {
		const requestBody = {
			projectId: res.data._id,
		};

		axios.post(`/users/addProject/${loggedInUser._id}`, requestBody)
			.then(() => {
				props.setIsOpen(false);
				history.push(`/project/${requestBody.projectId}`);
			}).catch((err) => {
				console.log(err);
			});
	}


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const project = {
			...projectState,
			creator: loggedInUser._id,
			organizationId: loggedInUser.organizationId,
		}

		axios.post('/projects/add', project)
			.then((res) => {
				addProjectToUser(res);
			}).catch((err) => {
				console.log(err);
				setErrorText('Project name already taken');
				setIsValid(false);
			});
	}


	return (
		<AddProjectModal
			onSubmit={onSubmit}
			projectState={projectState}
			dispatch={dispatch}
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			isValid={isValid}
			setIsValid={setIsValid}
			errorText={errorText}
			setErrorText={setErrorText}
		/>
	);
}

export default AddProject;