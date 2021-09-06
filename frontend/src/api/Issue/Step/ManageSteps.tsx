import axios from 'axios';
import { FC } from 'react';
import IssueStepsGallery from '../../../components/Issue/Step/IssueStepsGallery';
import { INestedIssue } from '../../../types/ModelTypes';


interface ManageStepsProps {
	issue: INestedIssue,
}


const ManageSteps: FC<ManageStepsProps> = (props) => {

	function updateSteps() {
		const requestBody = {
			steps: props.issue.steps,
		};

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
				console.log(err);
			})
	}


	return (
		<IssueStepsGallery
			issue={props.issue}
			updateSteps={updateSteps}
		/>
	);
}

export default ManageSteps;