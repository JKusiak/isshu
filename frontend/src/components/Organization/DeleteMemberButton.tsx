import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext, useState } from "react";
import { FetchMembersContext } from "../../api/Authentication/GetHomePage";
import { INestedUser } from "../../types/ModelTypes";
import ConfirmationModal from "../Commons/ConfirmationModal";



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
		},
		icon: {
			color: theme.palette.secondary.main,
		},
	}))


interface DeleteMemberButtonProps {
	clickedMember: INestedUser,
	deleteMember: () => void,
}

const DeleteMemberButton: FC<DeleteMemberButtonProps> = (props) => {
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);
	const { members, setMembers } = useContext(FetchMembersContext);


	function handleDelete() {
		const newMembers = members.filter(member => member._id !== props.clickedMember._id) as any;

		setMembers(newMembers);
		props.deleteMember();
	}


	return (
		<>
			<IconButton className={classes.button} onClick={() => { setModalOpen(true) }}>
				<DeleteIcon className={classes.icon} />
			</IconButton>

			<ConfirmationModal
				handleConfirm={handleDelete}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
		</>
	);
}

export default DeleteMemberButton