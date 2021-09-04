import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersGallery from "../../components/User/UsersGallery";
import { getLoggedInUser } from "../../functions/GetLoggedInUser";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";


interface GetUsersGalleryProps {
	mobileOpen: boolean,
	handleSidebarToggle: () => void,
}


const GetUsersGallery: FC<GetUsersGalleryProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	const [otherUsers, setOtherUsers] = useState<[IUser]>([UserTemplate]);
	const [contributors, setContributors] = useState<[IUser]>([UserTemplate]);
	const organizationId = getLoggedInUser().organizationId;

	useEffect(() => {
		fetchOtherUsers();
		fetchContributors();
	}, [projectId]);


	// fetching users that do not belong to currently displayed project
	function fetchOtherUsers() {
		axios.get(`http://localhost:5000/users/getUsersWithoutProject/${organizationId}/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setOtherUsers(resp.data);
		}).catch((err) => {
			console.log(err);
		});
	}


	// fetching users that belong to currently displayed project
	function fetchContributors() {
		axios.get(`http://localhost:5000/users/getUsersByProject/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setContributors(resp.data);
		}).catch((err) => {
			console.log(err);
		});;
	}


	// add currently displayed project to clicked user
	function addProjectToUser(userId: string) {
		const projectIdData = {
			projectId: projectId
		}

		axios.post(`http://localhost:5000/users/addProject/${userId}`, projectIdData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((resp) => {

		}).catch((err) => {
			console.log(err);
		});

		fetchContributors();
		fetchOtherUsers();
	}


	// remove currently displayed project from clicked user
	function removeProjectFromUser(userId: string) {
		axios.delete(`http://localhost:5000/users/deleteProject/${userId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			data: {
				projectId: projectId
			}
		}).then(() => {

		}).catch((err) => {
			console.log(err);
		});

		fetchContributors();
		fetchOtherUsers();
	}


	return (
		<>
			<UsersGallery
				contributors={contributors}
				otherUsers={otherUsers}
				mobileOpen={props.mobileOpen}
				handleSidebarToggle={props.handleSidebarToggle}
				addProjectToUser={addProjectToUser}
				removeProjectFromUser={removeProjectFromUser}
			/>
		</>
	);
}

export default GetUsersGallery;