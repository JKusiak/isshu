import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { IOrganization } from '../../types/ModelTypes';
import OrganizationNameButton from '../buttons/OrganizationNameButton';


interface UpdateOrganizationProps {
	organization: IOrganization,
}


const UpdateOrganization: FC<UpdateOrganizationProps> = (props) => {
	const [tempOrgName, setTempOrgName] = useState(props.organization.name);


	useEffect(() => {
		setTempOrgName(props.organization.name)
	}, [props.organization.name]);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		const requestBody = {
			name: tempOrgName,
		}

		axios.post(`http://localhost:5000/organization/update/${props.organization._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
	}


	return (
		<>
			<OrganizationNameButton
				tempOrgName={tempOrgName}
				setTempOrgName={setTempOrgName}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default UpdateOrganization;