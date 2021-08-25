import axios from "axios";
import { useEffect, useState } from "react";
import { NestedUserTemplate, OrganizationTemplate, ProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedUser, IOrganization, IProject } from "../../types/ModelTypes";
import HomePage from "../pages/HomePage";
import { getLoggedInUser } from "./GetLoggedInUser";


const GetHomePage = () => {
	const [organization, setOrganization] = useState<IOrganization>(OrganizationTemplate);
	const [userProjects, setUserProjects] = useState<[IProject]>([ProjectTemplate]);
	const [members, setMembers] = useState<[INestedUser]>([NestedUserTemplate]);
	const loggedInUser = getLoggedInUser();


	useEffect(() => {
		fetchUserProjects();
		fetchOrganization();
		fetchMembers();
	}, []);


	function fetchOrganization() {
		axios.get(`http://localhost:5000/organization/${loggedInUser.organizationId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setOrganization(resp.data);
		}).catch((err) => {
			console.log(err);
		});;
	}


	function fetchMembers() {
		axios.get(`http://localhost:5000/organization/members/${loggedInUser.organizationId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setMembers(resp.data);
		}).catch((err) => {
			console.log(err);
		});;
	}
	

	function fetchUserProjects() {
		axios.get(`http://localhost:5000/users/getProjects/${loggedInUser._id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setUserProjects(resp.data.projects);
		}).catch((err) => {
			console.log(err);
		});;
	}


	return (
		<>
			<HomePage 
				organization={organization}
				members={members}
				userProjects={userProjects}
			/>
		</>
	);
}

export default GetHomePage;