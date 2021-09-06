import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../App";
import HomePage from "../../pages/Home/HomePage";
import { NestedUserTemplate, OrganizationTemplate, UserTemplate } from "../../types/ModelContentTemplate";
import { INestedUser, IOrganization, IUser } from "../../types/ModelTypes";


export const FetchMembersContext = createContext<{ members: [INestedUser], setMembers: React.Dispatch<React.SetStateAction<[INestedUser]>> }>({} as any);


const GetHomePage = () => {
	const [organization, setOrganization] = useState<IOrganization>(OrganizationTemplate);
	const [user, setUser] = useState<IUser>(UserTemplate);
	const [members, setMembers] = useState<[INestedUser]>([NestedUserTemplate]);
	const [isLoaded, setIsLoaded] = useState(false);
	const { loggedInUser } = useContext(AuthUserContext);


	useEffect(() => {
		fetchUser();
		if (user.organizationId !== '') {
			fetchOrganization();
			fetchMembers();
		}
	}, [user.organizationId]);


	function fetchUser() {
		axios.get(`/users/getProjects/${loggedInUser._id}`)
			.then(resp => {
				setUser(resp.data);
				setIsLoaded(true);
			}).catch((err) => {
				console.log(err);
			});
	}


	function fetchOrganization() {
		if (user.organizationId) {
			axios.get(`/organization/${user.organizationId}`)
				.then(resp => {
					setOrganization(resp.data);
				}).catch((err) => {
					console.log(err);
				});;
		}
	}


	function fetchMembers() {
		if (user.organizationId) {
			axios.get(`/organization/members/${user.organizationId}`)
				.then(resp => {
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