import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import UpdateDescriptionButton from '../../buttons/issueButtons/UpdateDescriptionButton';
import { ActionTypes } from '../../reducers/BoardReducer';
import { BoardReducerContext } from '../GetBoard';


interface UpdateDescriptionProps {
	issue: INestedIssue,
}


const UpdateDescription: FC<UpdateDescriptionProps> = (props) => {
	const [tempDescription, setTempDescription] = useState<string>(props.issue.description);
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (tempDescription === '') return;

		const requestBody = {
			description: tempDescription,
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
				description: tempDescription,
			},
		}
		dispatch({ type: ActionTypes.UpdateIssue, payload: payload })
	}


	return (
		<UpdateDescriptionButton
			tempDescription={tempDescription}
			setTempDescription={setTempDescription}
			permDescription={props.issue.description}
			onSubmit={onSubmit}
		/>
	);
}

export default UpdateDescription;