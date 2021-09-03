import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import AttachmentsGallery from '../../galleries/AttachmentsGallery';
import { ActionTypes } from '../../reducers/BoardReducer';
import { BoardReducerContext } from '../GetBoard';
import { getLoggedInUser } from '../GetLoggedInUser';


interface UpdateAttachmentsProps {
      issue: INestedIssue,
}


const UpdateAttachments: FC<UpdateAttachmentsProps> = (props) => {
      const [file, setFile] = useState<string | Blob>('');
      const [urls, setUrls] = useState<[string]>(['']);
      const loggedInUser = getLoggedInUser();
      const { dispatch } = useContext(BoardReducerContext);


      // // when props are loaded, fetches image from the server
      // useEffect(() => {
      // 	if (props.user._id) {
      // 		fetchImage(`uploads/organization-${props.user.organizationId}/user-profile/${props.user._id}.jpg`);
      // 	}
      // }, [props.user._id]);


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
            }).then((resp) => {
                  // const adjustedPath = resp.data.replaceAll('\\', '/');
                  // setUrls(...urls, adjustedPath);
                  // props.setErrorText('');
            }).catch((err) => {
                  // props.setErrorText('Please upload in .jpg format and under 1MB file size');
            })
      }


      // function fetchImage(path: string) {
      // 	axios.get(`http://localhost:5000/${path}`, {
      // 		headers: {
      // 			'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // 		}
      // 	}).then(() => {
      // 		setUrl('');
      // 		setUrl(`http://localhost:5000/${path}`);
      // 	}).catch((err) => {
      // 		setUrl(undefined);
      // 	})
      // }


      function deleteAttachment() {
            // const adjustedMessages = props.issue.messages.map(message => {
            //       const changedMessage: IMessage = {
            //             ...message,
            //             sender: message.sender._id,
            //       }

            //       return changedMessage;
            // });

            // const requestBody = {
            //       messages: adjustedMessages,
            // }

            // axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
            //       headers: {
            //             'Authorization': `Bearer ${localStorage.getItem('token')}`
            //       }
            // }).catch((err) => {
            //       console.log(err);
            // })
      }

      return (
            <AttachmentsGallery
                  issue={props.issue}
                  addAttachment={addAttachment}
            />
      );
}

export default UpdateAttachments;
