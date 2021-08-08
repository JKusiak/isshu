import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { INestedColumn } from '../../types/ModelTypes';
import { getLoggedInUser } from './GetLoggedInUser';
import AddIssueButton from '../buttons/AddIssueButton';


interface AddIssueProps {
      column: INestedColumn,
      fetchBoard: () => void,
}


const AddIssue: FC<AddIssueProps> = (props) => {
      const [issueDescription, setIssueDescription] = useState('');
      const [addMode, setAddMode] = useState(false);


      const issue = {
            description: issueDescription,
            creator: getLoggedInUser()._id,
      }
  

      function addIssueToColumn(res: AxiosResponse) {
            const issueToAdd = {
                  issueId: res.data._id,
            };

            const columnId = props.column._id;

            axios.post(`http://localhost:5000/columns/addIssue/${columnId}`, issueToAdd, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  setAddMode(false);
                  props.fetchBoard();
            }).catch((err) => {
                  console.log(err);
            });
      }


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            axios.post('http://localhost:5000/issues/add', issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  addIssueToColumn(res);
            })
      } 


      return (
            <AddIssueButton
                  onSubmit={onSubmit}
                  addMode={addMode}
                  setAddMode={setAddMode}
                  setIssueDescription={setIssueDescription}
            />
      );
}

export default AddIssue;