import axios, { AxiosResponse } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import AddProjectModal from '../modals/AddProjectModal';
import { getLoggedInUser } from './GetLoggedInUser';


interface AddProjectProps {

}


const AddProject: FC<AddProjectProps> = (props) => {
	let history = useHistory();
	const formattedDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [projectName, setProjectName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [startDate, setStartDate] = useState<Date | null>(formattedDate);
	const [endDate, setEndDate] = useState<Date | null>(formattedDate);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [errorText, setErrorText] = useState<string>('');
	const loggedInUser = getLoggedInUser();

	useEffect(() => {
		if (endDate! >= startDate!) {
			setIsValid(true);
		} else {
			setErrorText("End date can not be before start date");
			setIsValid(false);
		}
	}, [startDate, endDate]);


	function addProjectToUser(res: AxiosResponse) {
		const newProjectId = {
			projectId: res.data._id,
		};

		axios.post(`http://localhost:5000/users/addProject/${loggedInUser._id}`, newProjectId, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(() => {
			setIsOpen(false);
			history.push(`/project/${newProjectId.projectId}`);
		}).catch((err) => {
			console.log(err);
		});
	}


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const project = {
			name: projectName,
			description: description,
			dateStart: startDate,
			dateEnd: endDate,
			creator: loggedInUser._id,
			organizationId: loggedInUser.organizationId,
		}

		axios.post('http://localhost:5000/projects/add', project, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((res) => {
			addProjectToUser(res);
		}).catch((err) => {
			console.log(err);
			setErrorText('Project name already taken');
			setIsValid(false);
		});
	}


	return (
		<>
			<AddProjectModal
				onSubmit={onSubmit}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				isValid={isValid}
				setIsValid={setIsValid}
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				errorText={errorText}
				setErrorText={setErrorText}
				setProjectName={setProjectName}
				setDescription={setDescription}
			/>
		</>
	);
}

export default AddProject;