import axios from 'axios';
import { FC } from 'react';
import UpdateCompletionButton from '../../components/Issue/UpdateCompletionButton';
import { INestedIssue } from '../../types/ModelTypes';


interface ManageCompletionProps {
	issue: INestedIssue,
}


const ManageCompletion: FC<ManageCompletionProps> = (props) => {

	function updateCompletion() {
		const isFinished = props.issue.isFinished;
		const requestBody = {
			isFinished: isFinished,
		}

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
				console.log(err);
			})
	}


	return (
		<UpdateCompletionButton
			issue={props.issue}
			updateCompletion={updateCompletion}
		/>
	);
}

export default ManageCompletion;