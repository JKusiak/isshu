import axios from 'axios';
import { FC, useContext } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import AttachmentsGallery from '../../galleries/AttachmentsGallery';
import { ActionTypes } from '../../reducers/BoardReducer';
import { BoardReducerContext } from '../GetBoard';
import { getLoggedInUser } from '../GetLoggedInUser';


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
                  // payload is dispatched second time to update the new attachment with id from database
                  const payload = {
                        columnId: props.issue.columnId,
                        issueId: props.issue._id,
                        modified: {
                              attachments: attachments,
                        },
                  };

                  dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
                  uploadImage(file, newAttachment._id);
            }).catch((err) => {
                  console.log(err);
            })
      }


      function uploadImage(file: string | Blob, attachmentId: string) {
            const formData = new FormData();

            formData.append('organizationId', loggedInUser.organizationId);
            formData.append('directory', `issues/issue-${props.issue._id}`);
            formData.append('imageUpload', file);

            axios.post(`http://localhost:5000/uploads/add/${attachmentId}`, formData, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                  }
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


      function deleteImage() {

      }


      return (
            <AttachmentsGallery
                  issue={props.issue}
                  addAttachment={addAttachment}
                  deleteAttachment={deleteAttachment}
            />
      );
}

export default UpdateAttachments;
