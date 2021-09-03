import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { IColumn } from '../../types/ModelTypes';
import AddIssueButton from '../buttons/AddIssueButton';
import { ActionTypes } from '../reducers/BoardReducer';
import { BoardReducerContext } from './GetBoard';
import { getLoggedInUser } from './GetLoggedInUser';


interface AddIssueProps {
	column: IColumn,
}


const AddIssue: FC<AddIssueProps> = (props) => {
	const [issueName, setIssueName] = useState<string>('');
	const [addMode, setAddMode] = useState<boolean>(false);
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (issueName === '') {
			setAddMode(false);
			return;
		}

		const requestBody = {
			name: issueName,
			creator: getLoggedInUser()._id,
			columnId: props.column._id,
		}

		axios.post('http://localhost:5000/issues/add', requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((res) => {
			setAddMode(false);
			dispatch({ type: ActionTypes.AddIssue, payload: res.data })
		})
	}


	return (
		<AddIssueButton
			onSubmit={onSubmit}
			addMode={addMode}
			setAddMode={setAddMode}
			setIssueName={setIssueName}
		/>
	);
}

export default AddIssue;