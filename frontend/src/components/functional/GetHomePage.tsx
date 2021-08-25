import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { IProject } from "../../types/ModelTypes";
import HomePage from "../pages/HomePage";
import { getLoggedInUser } from "./GetLoggedInUser";


const GetHomePage = () => {
	const [projects, setProjects] = useState<[IProject]>([ProjectTemplate]);
	const loggedInUser = getLoggedInUser();



	useEffect(() => {
		fetchUserProjects();
		fetchOrganization();
	}, []);

	
	function fetchUserProjects() {
		axios.get(`http://localhost:5000/users/getProjects/${loggedInUser._id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(resp => {
				setProjects(resp.data.projects);
			}).catch((err) => {
				console.log(err);
		});;
	}


	function fetchOrganization() {
		
	}


	return (
		<>
			<HomePage projects={projects}/>
		</>
	);
}

export default GetHomePage;