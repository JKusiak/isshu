import React, { FC, useContext, useState } from 'react';
import axios from 'axios';
import { INestedIssue} from '../../../types/ModelTypes';
import { BoardReducerContext } from '../GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';
import UpdateNameButton from '../../buttons/issueButtons/UpdateNameButton';



interface UpdateNameProps {
      issue: INestedIssue,
}


const UpdateName: FC<UpdateNameProps> = (props) => {
      const [tempName, setTempName] = useState<string>(props.issue.name);
      const { dispatch } = useContext(BoardReducerContext);


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            if(tempName === '') return;

            const requestBody = {
                  description: tempName,
            }

            axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            })
            
            const payload = {
                  columnId: props.issue.columnId,
                  issueId: props.issue._id,
                  modified: {
                        name: tempName,
                  },
            }
            dispatch({type: ActionTypes.UpdateIssue, payload: payload})
      } 


      return (
            <UpdateNameButton
                  tempName={tempName}
                  setTempName={setTempName}
                  permName={props.issue.name}
                  onSubmit={onSubmit}
            />
      );
}

export default UpdateName;