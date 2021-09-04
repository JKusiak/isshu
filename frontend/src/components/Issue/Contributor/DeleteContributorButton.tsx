import { IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import React, { FC, useContext } from "react";
import { BoardReducerContext } from '../../../api/Board/GetBoard';
import { ActionTypes } from '../../../reducers/BoardReducer';
import { INestedIssue, INestedUser } from '../../../types/ModelTypes';



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		buttonWrapper: {
			marginLeft: 'auto',
		},
		iconButton: {
			justifyContent: 'center',
			alignItems: 'center',
			transform: 'scale(0.7)',
			padding: theme.spacing(1),
		},
		icon: {
			color: theme.palette.secondary.main,
		},
	})
);


interface DeleteContributorButtonProps {
	issue: INestedIssue,
	clickedContributor: INestedUser,
	updateContributors: () => void,
}

const DeleteContributorButton: FC<DeleteContributorButtonProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);


	function handleDelete(e: React.SyntheticEvent) {
		const updatedContributors = props.issue.contributors.filter(contributor =>
			props.issue.contributors.indexOf(contributor) !== props.issue.contributors.indexOf(props.clickedContributor));

		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				contributors: updatedContributors,
			},
		};

		dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
		props.updateContributors();
	}


	return (
		<>
			<div className={classes.buttonWrapper}>
				<IconButton className={classes.iconButton} onClick={handleDelete}>
					<DeleteIcon className={classes.icon} />
				</IconButton>
			</div>
		</>
	);
}

export default DeleteContributorButton;
