import axios from 'axios';
import { FC, useContext, useState } from 'react';
import ColumnNameButton from '../../components/Column/ColumnNameButton';
import { ActionTypes } from '../../reducers/BoardReducer';
import { INestedColumn } from '../../types/ModelTypes';
import { BoardReducerContext } from '../Board/GetBoard';



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

		axios.post(`/columns/update/${props.column._id}`, column);

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