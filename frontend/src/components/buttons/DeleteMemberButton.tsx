import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import { FC, useContext } from "react";
import { INestedUser } from "../../types/ModelTypes";
import { FetchMembersContext } from "../functional/GetHomePage";


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
	const { members, setMembers } = useContext(FetchMembersContext);

	function handleDelete() {
		const newMembers = members.filter(member => member._id !== props.clickedMember._id) as any;

		setMembers(newMembers);
		props.deleteMember();
	}

	return (
		<>
			<IconButton className={classes.button} onClick={handleDelete}>
				<DeleteIcon className={classes.icon} />
			</IconButton>
		</>
	);
}

export default DeleteMemberButton