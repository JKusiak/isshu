import axios from 'axios';
import React, { FC } from 'react';
import ArchivizeIssueButton from '../../components/Issue/ArchivizeIssueButton';
import { getLoggedInUser } from '../../functions/GetLoggedInUser';
import { INestedIssue } from '../../types/ModelTypes';


interface ArchivizeIssueProps {
	issue: INestedIssue,
	setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


// this does not work as delete because issues remain after deleting
// in the organization archive of all issues
const ArchivizeIssue: FC<ArchivizeIssueProps> = (props) => {
	const loggedInUser = getLoggedInUser();

	function updateIssue() {
		const requestBody = {
			columnId: null,
			contributors: [],
		}

		axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).catch((err) => {
			console.log(err);
		})
	}


	function addToArchive() {
		const requestBody = {
			issueId: props.issue._id,
		}
		axios.post(`http://localhost:5000/organization/addToArchive/${loggedInUser.organizationId}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).catch((err) => {
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