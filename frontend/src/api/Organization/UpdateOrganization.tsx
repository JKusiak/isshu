import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import OrganizationNameButton from '../../components/Organization/OrganizationNameButton';
import { IOrganization } from '../../types/ModelTypes';



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

		axios.post(`/organization/update/${props.organization._id}`, requestBody);
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