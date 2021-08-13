import { IconButton } from "@material-ui/core";
import { FC } from "react";
import DeleteIcon from '@material-ui/icons/ClearOutlined';


interface DeleteColumnButtonProps {
      deleteColumn: () => void,
}


const DeleteColumnButton: FC<DeleteColumnButtonProps> = (props) => {
      return (
            <>
                  <IconButton onClick={props.deleteColumn}>
                        <DeleteIcon />
                  </IconButton>
            </>
      );

}

export default DeleteColumnButton