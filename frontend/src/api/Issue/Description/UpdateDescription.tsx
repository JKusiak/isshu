import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import UpdateDescriptionButton from '../../../components/Issue/Description/UpdateDescriptionButton';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { INestedIssue } from '../../../types/ModelTypes';
import { BoardReducerContext } from '../../Board/GetBoard';


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

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
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