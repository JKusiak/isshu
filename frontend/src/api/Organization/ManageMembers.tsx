import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../App";
import AddMemberButton from "../../components/Organization/AddMemberButton";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";



const GetAllUsers = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [query, setQuery] = useState('');
	const [addedUser, setAddedUser] = useState<IUser>(UserTemplate);
	const { loggedInUser } = useContext(AuthUserContext);
	const queryTreshold = query.length >= 3;


	useEffect(() => {
		fetchAllUsers();
	}, [queryTreshold])


	// fetching users that do not belong to any organization
	function fetchAllUsers() {
		axios.get(`/users/`)
			.then(resp => {
				setAllUsers(resp.data);
			}).catch((err) => {
				console.log(err);
			});
	}


	function sendMemberInvite() {
		// check to see if already got invite to avoid sending twice
		if (addedUser.invitations.some(invite => invite === loggedInUser.organizationId)) return;

		const requestBody = {
			invitations: [...addedUser.invitations, loggedInUser.organizationId]
		}

		axios.post(`/users/update/${addedUser._id}`, requestBody)
			.catch((err) => {
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