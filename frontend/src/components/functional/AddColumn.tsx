import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddColumnButton from '../buttons/AddColumnButton';
import { ActionTypes } from '../reducers/BoardReducer';
import { BoardReducerContext } from './GetBoard';


interface AddColumnProps {
}


const AddColumn: FC<AddColumnProps> = (props) => {
	const { boardId } = useParams<{ boardId: string }>();
	const [columnName, setColumnName] = useState<string>('');
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		// e.preventDefault();

		const requestBody = {
			columnName: columnName,
			boardId: boardId,
		};

		axios.post('http://localhost:5000/columns/add', requestBody, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((resp) => {
			setColumnName('');
			const payload = {
				...resp.data,
				issues: [],
			}
			dispatch({ type: ActionTypes.AddColumn, payload: payload })
		})
	}


	return (
		<>
			<AddColumnButton
				onSubmit={onSubmit}
				setColumnName={setColumnName}
			/>
		</>
	);
}

export default AddColumn;