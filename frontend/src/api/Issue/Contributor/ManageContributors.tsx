import axios from 'axios';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import IssueContributorsGallery from '../../../components/Issue/Contributor/IssueContributorsGallery';
import { useMountEffect } from '../../../hooks/useMountEffect';
import { UserTemplate } from '../../../types/ModelContentTemplate';
import { INestedIssue, IUser } from '../../../types/ModelTypes';


interface ManageContributorsProps {
	issue: INestedIssue,
}


const ManageContributors: FC<ManageContributorsProps> = (props) => {
	const { projectId } = useParams<{ projectId: string }>();
	const [projectContributors, setProjectContributors] = useState<[IUser]>([UserTemplate]);


	useMountEffect(fetchContributors);


	function fetchContributors() {
		axios.get(`http://localhost:5000/users/getUsersByProject/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then(resp => {
			setProjectContributors(resp.data);
		}).catch((err) => {
			console.log(err);
		});;
	}


	function updateContributors() {
		const contributorsToId = props.issue.contributors.map(contributor => contributor._id);

		const requestBody = {
			contributors: contributorsToId,
		}

		axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).catch((err) => {
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