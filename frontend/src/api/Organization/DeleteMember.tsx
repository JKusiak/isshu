import axios from "axios";
import { FC } from "react";
import DeleteMemberButton from "../../components/Organization/DeleteMemberButton";
import { INestedUser } from "../../types/ModelTypes";



interface DeleteMemberProps {
	member: INestedUser,
}


const DeleteMember: FC<DeleteMemberProps> = (props) => {

	function deleteMember() {
		const requestBody = {
			organizationId: null,
			projects: [],
		};

		axios.post(`/users/update/${props.member._id}`, requestBody)
			.catch((err) => {
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