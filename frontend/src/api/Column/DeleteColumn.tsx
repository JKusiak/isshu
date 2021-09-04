import axios from "axios";
import { FC } from "react";
import DeleteColumnButton from "../../components/Column/DeleteColumnButton";
import { IColumn } from "../../types/ModelTypes";



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