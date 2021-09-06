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
		axios.get(`/users/${userId}`)
			.then(resp => {
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