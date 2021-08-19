import axios from 'axios';
import React, { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import ArchivizeIssueButton from '../../buttons/issueButtons/ArchivizeIssueButton';


interface ArchivizeIssueProps {
	issue: INestedIssue,
	setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


// this does not work as delete because issues remain after deleting
// in the organization archive of all issues
const ArchivizeIssue: FC<ArchivizeIssueProps> = (props) => {
	
	function archivizeIssue() {
		const requestBody = {
			columnId: null,
		}

		axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
		}).catch((err) => {
				console.log(err);
		})

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