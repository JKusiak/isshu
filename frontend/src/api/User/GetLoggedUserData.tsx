import axios from "axios";
import { useEffect, useState } from "react";
import PersonalData from "../../components/User/PersonalData";
import { getLoggedInUser } from "../../functions/GetLoggedInUser";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";



const GetLoggedUserData = () => {
	const [user, setUser] = useState<IUser>(UserTemplate);

	useEffect(() => {
		axios.get(`http://localhost:5000/users/${getLoggedInUser()._id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setUser(resp.data);
		}).catch((err) => {
			console.log(err);
		});
	}, []);


	return (
		<>
			<PersonalData user={user} />
		</>
	);
}

export default GetLoggedUserData;