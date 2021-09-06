import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { AuthUserContext } from '../../App';
import AddIssueButton from '../../components/Issue/AddIssueButton';
import { ActionTypes } from '../../reducers/BoardReducer';
import { IColumn } from '../../types/ModelTypes';
import { BoardReducerContext } from '../Board/GetBoard';


interface AddIssueProps {
	column: IColumn,
}


const AddIssue: FC<AddIssueProps> = (props) => {
	const [issueName, setIssueName] = useState<string>('');
	const [addMode, setAddMode] = useState<boolean>(false);
	const { dispatch } = useContext(BoardReducerContext);
	const { loggedInUser } = useContext(AuthUserContext);

	
	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (issueName === '') {
			setAddMode(false);
			return;
		}

		const requestBody = {
			name: issueName,
			creator: loggedInUser._id,
			columnId: props.column._id,
		}

		axios.post('/issues/add', requestBody)
			.then((res) => {
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