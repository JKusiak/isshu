import axios from "axios";
import { FC } from "react";
import DeleteColumnButton from "../../components/Column/DeleteColumnButton";
import { IColumn } from "../../types/ModelTypes";



interface DeleteColumnProps {
	column: IColumn,
}


const DeleteColumn: FC<DeleteColumnProps> = (props) => {

	function deleteColumn() {
		axios.delete(`/columns/delete/${props.column._id}`)
			.catch((err) => {
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