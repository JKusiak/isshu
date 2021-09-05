import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonalData from "../../components/User/PersonalData";
import { UserTemplate } from "../../types/ModelContentTemplate";
import { IUser } from "../../types/ModelTypes";



const GetData = () => {
	const { userId } = useParams<{ userId: string }>();
	const [user, setUser] = useState<IUser>(UserTemplate);

	useEffect(() => {
		axios.get(`http://localhost:5000/users/${userId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setUser(resp.data);
		}).catch((err) => {
			console.log(err);
		});
	}, [userId]);


	return (
		<>
			<PersonalData user={user} />
		</>
	);
}

export default GetData;