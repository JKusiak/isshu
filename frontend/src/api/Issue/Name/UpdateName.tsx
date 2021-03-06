import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import UpdateNameButton from '../../../components/Issue/Name/UpdateNameButton';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { INestedIssue } from '../../../types/ModelTypes';
import { BoardReducerContext } from '../../Board/GetBoard';


interface UpdateNameProps {
	issue: INestedIssue,
}


const UpdateName: FC<UpdateNameProps> = (props) => {
	const [tempName, setTempName] = useState<string>(props.issue.name);
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (tempName === '') return;

		const requestBody = {
			name: tempName,
		}

		axios.post(`/issues/update/${props.issue._id}`, requestBody)
			.catch((err) => {
				console.log(err);
			})

		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				name: tempName,
			},
		}
		dispatch({ type: ActionTypes.UpdateIssue, payload: payload })
	}


	return (
		<UpdateNameButton
			issue={props.issue}
			tempName={tempName}
			setTempName={setTempName}
			permName={props.issue.name}
			onSubmit={onSubmit}
		/>
	);
}

export default UpdateName;