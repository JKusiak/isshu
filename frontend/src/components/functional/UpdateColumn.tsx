import axios from 'axios';
import { FC, useContext, useState } from 'react';
import { INestedColumn } from '../../types/ModelTypes';
import ColumnNameButton from '../buttons/ColumnNameButton';
import { ActionTypes } from '../reducers/BoardReducer';
import { BoardReducerContext } from './GetBoard';


interface UpdateColumnProps {
	column: INestedColumn,
}


const UpdateColumn: FC<UpdateColumnProps> = (props) => {
	const [tempColumnName, setTempColumnName] = useState(props.column.name);
	const { dispatch } = useContext(BoardReducerContext);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (tempColumnName === '') return;

		const column = {
			name: tempColumnName,
		}

		axios.post(`http://localhost:5000/columns/update/${props.column._id}`, column, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})

		const payload = {
			newName: tempColumnName,
			columnId: props.column._id,
		}

		dispatch({ type: ActionTypes.UpdateColumn, payload: payload })
	}


	return (
		<>
			<ColumnNameButton
				tempColumnName={tempColumnName}
				setTempColumnName={setTempColumnName}
				permColumnName={props.column.name}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default UpdateColumn;