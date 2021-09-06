import axios from 'axios';
import AddOrganizationModal from '../../components/Organization/AddOrganizationModal';
import { IUser } from '../../types/ModelTypes';
import { getLoggedInUser } from '../User/GetLoggedInUser';



const AddOrganization = () => {
	const currentUser = getLoggedInUser();

	function onSubmit(orgName: string) {
		const requestBody = {
			name: orgName,
		};

		axios.post('/organization/add', requestBody)
			.then((res) => {
				updateUserOrganization(res.data._id);
			}).catch((err) => {
				console.log(err);
			});
	}

	function updateUserOrganization(orgId: String) {
		const requestBody = {
			organizationId: orgId,
		};

		axios.post(`/users/update/${currentUser._id}`, requestBody)
			.then((res) => {
				updateToken(res.data);
			}).catch((err) => {
				console.log(err);
			})
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
			<AddOrganizationModal
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default AddOrganization;