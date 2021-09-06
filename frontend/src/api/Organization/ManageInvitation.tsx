import axios from "axios";
import { FC } from "react";
import InvitationModal from "../../components/Organization/InvitationModal";
import { IOrganization, IUser } from "../../types/ModelTypes";



interface ManageInvitationsProps {
	invite: IOrganization,
	user: any,
}


const ManageInvitations: FC<ManageInvitationsProps> = (props) => {

	function accept() {
		const requestBody = {
			organizationId: props.invite._id,
			invitations: []
		}
		axios.post(`/users/update/${props.user._id}`, requestBody)
			.then((resp) => {
				updateToken(resp.data);
			}).catch((err) => {
				console.log(err);
			});
	}


	function updateToken(user: IUser) {
		const requestBody = {
			_id: user._id,
			email: user.email,
			name: user.name,
			surname: user.surname,
			organizationId: user.organizationId,
		}

		axios.post(`/login/newOrganization/`, requestBody)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				window.location.reload();
			}).catch((err) => {
				console.log(err);
			})
	}


	return (
		<>
			<InvitationModal invite={props.invite} accept={accept} />
		</>
	);
}

export default ManageInvitations;