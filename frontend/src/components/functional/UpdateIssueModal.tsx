import React, { FC, useContext, useState } from 'react';
import axios from 'axios';
import { INestedIssue, INestedUser, ITag, IUser } from '../../types/ModelTypes';
import IssueModal from '../modals/IssueModal';
import { TagTemplate } from '../../types/ModelContentTemplate';
import { BoardReducerContext } from './GetBoard';
import { ActionTypes } from '../reducers/BoardReducer';


interface UpdateIssueModalProps {
      issue: INestedIssue,
      isModalOpen: boolean,
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const UpdateIssueModal: FC<UpdateIssueModalProps> = (props) => {
      const [name, setName] = useState<string>(props.issue.name);
      const [description, setDescription] = useState<string>(props.issue.description);
      const [contributors, setContributors] = useState<[INestedUser]>(props.issue.contributors);
      const [tags, setTags] = useState<[ITag]>(props.issue.tags);
      const [messages, setMessages] = useState<[string]>(props.issue.messages);
      const [steps, setSteps] = useState<[string]>(props.issue.steps);
      const dispatch = useContext(BoardReducerContext);


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const issue = {
                  name: props.issue.name,
                  description: props.issue.description,
                  contributors: props.issue.contributors,
                  tags: props.issue.tags,
                  messages: props.issue.messages,
                  steps: props.issue.steps,
            }

            axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  // dispatch({type: ActionTypes.UpdateIssue, payload: issue})
            })
            
      } 


      return (
            <IssueModal
                  issue={props.issue}
                  isModalOpen={props.isModalOpen}
                  setIsModalOpen={props.setIsModalOpen}
                  onSubmit={onSubmit}
            />
      );
}

export default UpdateIssueModal;