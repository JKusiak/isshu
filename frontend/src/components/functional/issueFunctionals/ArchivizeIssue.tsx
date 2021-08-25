import axios from 'axios';
import React, { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import ArchivizeIssueButton from '../../buttons/issueButtons/ArchivizeIssueButton';
import { getLoggedInUser } from '../GetLoggedInUser';


interface ArchivizeIssueProps {
	issue: INestedIssue,
	setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


// this does not work as delete because issues remain after deleting
// in the organization archive of all issues
const ArchivizeIssue: FC<ArchivizeIssueProps> = (props) => {
	

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

		axios.post(`http://localhost:5000/organization/addToArchive/${getLoggedInUser().organizationId}`, requestBody, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
		}).catch((err) => {
				console.log(err);
		})
	}


	function archivizeIssue() {
		updateIssue();
		addToArchive();
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