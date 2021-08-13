import React, { FC, useState } from 'react';
import axios from 'axios';
import { IIssue, INestedIssue, ITag } from '../../types/ModelTypes';
import IssueModal from '../modals/IssueModal';
import { TagTemplate } from '../../types/ModelContentTemplate';


interface UpdateIssueModalProps {
      issue: INestedIssue,
      isModalOpen: boolean,
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const UpdateIssueModal: FC<UpdateIssueModalProps> = (props) => {
      const [name, setName] = useState<string>(props.issue.name);
      const [description, setDescription] = useState<string>(props.issue.description);
      const [contributors, setContributors] = useState<[string]>();
      const [tags, setTags] = useState<[ITag]>([TagTemplate]);
      const [messages, setMessages] = useState<[string]>(props.issue.messages);
      const [steps, setSteps] = useState<[string]>(props.issue.steps);
    


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();

            const issue = {
                  name: name,
                  description: description,
                  contributors: contributors,
                  tags: tags,
                  messages: messages,
                  steps: steps,
            }

            axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {

            })
            
      } 


      return (
            <IssueModal
                  issue={props.issue}
                  isModalOpen={props.isModalOpen}
                  setIsModalOpen={props.setIsModalOpen}
            />
      );
}

export default UpdateIssueModal;