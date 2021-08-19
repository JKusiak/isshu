import axios from 'axios';
import { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import UpdateCompletionButton from '../../buttons/issueButtons/UpdateCompletionButton';


interface ManageCompletionProps {
      issue: INestedIssue,
}


const ManageCompletion: FC<ManageCompletionProps> = (props) => {

      function updateCompletion() {
            const isFinished = props.issue.isFinished;
            const requestBody = {
				isFinished: isFinished,
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
		<UpdateCompletionButton
			issue={props.issue}
			updateCompletion={updateCompletion}
        />
      );
}

export default ManageCompletion;