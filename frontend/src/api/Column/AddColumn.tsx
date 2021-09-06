import axios from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddColumnButton from '../../components/Column/AddColumnButton';
import { ActionTypes } from '../../reducers/BoardReducer';
import { BoardReducerContext } from '../Board/GetBoard';



const AddColumn = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const [columnName, setColumnName] = useState<string>('');
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		// e.preventDefault();

		const requestBody = {
			columnName: columnName,
			boardId: boardId,
		};

		axios.post('/columns/add', requestBody)
			.then((resp) => {
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