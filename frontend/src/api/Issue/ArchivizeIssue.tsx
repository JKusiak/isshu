import axios from 'axios';
import React, { FC, useContext } from 'react';
import { AuthUserContext } from '../../App';
import ArchivizeIssueButton from '../../components/Issue/ArchivizeIssueButton';
import { INestedIssue } from '../../types/ModelTypes';


interface ArchivizeIssueProps {
	issue: INestedIssue,
	setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


// this does not work as delete because issues remain after deleting
// in the organization archive of all issues
const ArchivizeIssue: FC<ArchivizeIssueProps> = (props) => {
	const { loggedInUser } = useContext(AuthUserContext);

	function updateIssue() {
		const requestBody = {
			columnId: null,
			contributors: [],
		}

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
				console.log(err);
			})
	}


	function addToArchive() {
		const requestBody = {
			issueId: props.issue._id,
		}
		axios.post(`/organization/addToArchive/${loggedInUser.organizationId}`, requestBody)
			.catch((err) => {
				console.log(err);
			})
	}


	function archivizeIssue() {
		addToArchive();
		updateIssue();
		props.setIssueModalOpen(false);
	}


	return (
		<>
			<ArchivizeIssueButton
				issue={props.issue}
				archivizeIssue={archivizeIssue}
			/>
		</>
	);
}

export default ArchivizeIssue;