import axios from 'axios';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import IssueContributorsGallery from '../../../components/Issue/Contributor/IssueContributorsGallery';
import { useMountEffect } from '../../../hooks/useMountEffect';
import { UserTemplate } from '../../../types/ModelContentTemplate';
import { INestedIssue, IUser } from '../../../types/ModelTypes';


interface ManageContributorsProps {
	issue: INestedIssue,
	displayOnly: boolean,
}


const ManageContributors: FC<ManageContributorsProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	const [projectContributors, setProjectContributors] = useState<[IUser]>([UserTemplate]);


	useMountEffect(fetchContributors);


	function fetchContributors() {
		// necessary for displaying archived issue without contributors
		if(!props.displayOnly) {
			axios.get(`/users/getUsersByProject/${projectId}`)
			.then(resp => {
				setProjectContributors(resp.data);
			}).catch((err) => {
				console.log(err);
			});;
		}
	}


	function updateContributors() {
		const contributorsToId = props.issue.contributors.map(contributor => contributor._id);

		const requestBody = {
			contributors: contributorsToId,
		}

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
				console.log(err);
			})
	}


	return (
		<IssueContributorsGallery
			projectContributors={projectContributors}
			issue={props.issue}
			updateContributors={updateContributors}
		/>
	);
}

export default ManageContributors;