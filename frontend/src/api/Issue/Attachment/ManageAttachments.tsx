import axios from 'axios';
import { FC, useContext } from 'react';
import AttachmentsGallery from '../../../components/Issue/Attachment/AttachmentsGallery';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { IAttachment, INestedIssue } from '../../../types/ModelTypes';
import { BoardReducerContext } from '../../Board/GetBoard';
import { getLoggedInUser } from '../../User/GetLoggedInUser';


interface UpdateAttachmentsProps {
	issue: INestedIssue,
}


const UpdateAttachments: FC<UpdateAttachmentsProps> = (props) => {
	const loggedInUser = getLoggedInUser();
	const { dispatch } = useContext(BoardReducerContext);


	function addAttachment(file: string | Blob) {
		const requestBody = {
			attachments: props.issue.attachments,
		}
		axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((resp) => {
			const attachments = resp.data.attachments;
			const newAttachment = attachments[attachments.length - 1];

			uploadImage(file, newAttachment._id, attachments);
		}).catch((err) => {
			console.log(err);
		})
	}


	function uploadImage(file: string | Blob, attachmentId: string, attachments: [IAttachment]) {
		const formData = new FormData();

		formData.append('organizationId', loggedInUser.organizationId);
		formData.append('directory', `issues/issue-${props.issue._id}`);
		formData.append('imageUpload', file);

		axios.post(`http://localhost:5000/uploads/add/${attachmentId}`, formData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data'
			}
		}).then(() => {
			// payload is dispatched here again to update the new attachment with id from database
			// it is done after uploading image to fetch it on render of new attachment
			const payload = {
				columnId: props.issue.columnId,
				issueId: props.issue._id,
				modified: {
					attachments: attachments,
				},
			};
			dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
		}).catch((err) => {
			console.log(err);
		})
	}


	function deleteAttachment() {
		const requestBody = {
			attachments: props.issue.attachments,
		}
		axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).catch((err) => {
			console.log(err);
		})
	}


	function deleteImage(clickedAttachment: IAttachment) {
		// all the backslashes substituted with %2f as the path is send as one parameter
		const path = `uploads%2forganization-${loggedInUser.organizationId}%2fissues%2fissue-${props.issue._id}%2f${clickedAttachment._id}.jpg`;

		axios.delete(`http://localhost:5000/uploads/delete/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).catch((err) => {
			console.log(err);
		})
	}


	return (
		<AttachmentsGallery
			issue={props.issue}
			addAttachment={addAttachment}
			deleteAttachment={deleteAttachment}
			deleteImage={deleteImage}
		/>
	);
}

export default UpdateAttachments;
