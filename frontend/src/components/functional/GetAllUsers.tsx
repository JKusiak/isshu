import axios from "axios";
import { FC, useEffect, useState } from "react";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";
import AddMemberButton from "../buttons/AddMemberButton";
import { getLoggedInUser } from "./GetLoggedInUser";


interface GetUsersListProps {

}


const GetAllUsers: FC<GetUsersListProps> = (props) => {
	const [allUsers, setAllUsers] = useState([]);
	const [query, setQuery] = useState('');
	const [addedUser, setAddedUser] = useState<IUser>(UserTemplate);
	const loggedInUser = getLoggedInUser();

	useEffect(() => {
		fetchAllUsers();
	}, [query.length >= 3])


	// fetching users that do not belong to any organization
	function fetchAllUsers() {
		axios.get(`http://localhost:5000/users/`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setAllUsers(resp.data);
		}).catch((err) => {
			console.log(err);
		});
	}


	function sendMemberInvite() {
		const requestBody = {
			organizationId: loggedInUser.organizationId
		}
		axios.post(`http://localhost:5000/users/update/${addedUser._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	return (
		<>
			<AddMemberButton 
				allUsers={allUsers} 
				user={addedUser} 
				setUser={setAddedUser}
				query={query}
				setQuery={setQuery}
				sendMemberInvite={sendMemberInvite}
			/>
		</>
	);
}

export default GetAllUsers;