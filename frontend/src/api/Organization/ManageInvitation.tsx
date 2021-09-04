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
		axios.post(`http://localhost:5000/users/update/${props.user._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((resp) => {
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

		axios.post(`http://localhost:5000/login/newOrganization/`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((res) => {
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