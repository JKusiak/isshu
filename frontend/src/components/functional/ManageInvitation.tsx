import axios from "axios";
import { FC } from "react";
import { IOrganization } from "../../types/ModelTypes";
import InvitationModal from "../modals/InvitationModal";


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
		}).then(() =>{
			window.location.reload();
		}).catch((err) => {
			console.log(err);
		});
	}


	return (
		<>
			<InvitationModal invite={props.invite} accept={accept}/>
		</>
	);
}

export default ManageInvitations;