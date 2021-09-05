import axios from "axios";
import { createContext, useEffect, useState } from "react";
import HomePage from "../pages/Home/HomePage";
import { NestedUserTemplate, OrganizationTemplate, UserTemplate } from "../types/ModelContentTemplate";
import { INestedUser, IOrganization, IUser } from "../types/ModelTypes";
import { getLoggedInUser } from "./User/GetLoggedInUser";



export const FetchMembersContext = createContext<{ members: [INestedUser], setMembers: React.Dispatch<React.SetStateAction<[INestedUser]>> }>({} as any);

const GetHomePage = () => {
	const [organization, setOrganization] = useState<IOrganization>(OrganizationTemplate);
	const [user, setUser] = useState<IUser>(UserTemplate);
	const [members, setMembers] = useState<[INestedUser]>([NestedUserTemplate]);
	const [isLoaded, setIsLoaded] = useState(false);
	const loggedInUser = getLoggedInUser();


	useEffect(() => {
		fetchUser();
		if (user.organizationId !== '') {
			fetchOrganization();
			fetchMembers();
		}
	}, [user.organizationId]);


	function fetchUser() {
		axios.get(`http://localhost:5000/users/getProjects/${loggedInUser._id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setUser(resp.data);
			setIsLoaded(true);
		}).catch((err) => {
			console.log(err);
		});;
	}


	function fetchOrganization() {
		if (user.organizationId) {
			axios.get(`http://localhost:5000/organization/${user.organizationId}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}).then(resp => {
				setOrganization(resp.data);
			}).catch((err) => {
				console.log(err);
			});;
		}

	}


	function fetchMembers() {
		if (user.organizationId) {
			axios.get(`http://localhost:5000/organization/members/${user.organizationId}`, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			}).then(resp => {
				setMembers(resp.data);
			}).catch((err) => {
				console.log(err);
			});;
		}
	}


	return (
		<>
			{isLoaded &&
				<FetchMembersContext.Provider value={{ members, setMembers }}>
					<HomePage
						organization={organization}
						user={user}
					/>
				</FetchMembersContext.Provider>
			}
		</>
	);
}

export default GetHomePage;