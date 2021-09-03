import axios from "axios";
import { FC } from "react";
import { IColumn } from "../../types/ModelTypes";
import DeleteColumnButton from "../buttons/DeleteColumnButton";


interface DeleteColumnProps {
	column: IColumn,
}


const DeleteColumn: FC<DeleteColumnProps> = (props) => {

	function deleteColumn() {
		axios.delete(`http://localhost:5000/columns/delete/${props.column._id}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).catch((err) => {
			console.log(err);
		});
	}


	return (
		<>
			<DeleteColumnButton column={props.column} deleteColumn={deleteColumn} />
		</>
	);
}

export default DeleteColumn;