import axios from "axios";
import { FC } from "react";
import { INestedUser } from "../../types/ModelTypes";
import DeleteMemberButton from "../buttons/DeleteMemberButton";


interface DeleteMemberProps {
	member: INestedUser,
}


const DeleteMember: FC<DeleteMemberProps> = (props) => {

	function deleteMember() {
		const requestBody = {
			organizationId: null,
			projects: [],
		};

		axios.post(`http://localhost:5000/users/update/${props.member._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).catch((err) => {
			console.log(err);
		});
	}


	return (
		<>
			<DeleteMemberButton clickedMember={props.member} deleteMember={deleteMember} />
		</>
	);
}

export default DeleteMember;