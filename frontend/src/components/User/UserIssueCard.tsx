import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";
import { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import IssueModal from "../Issue/IssueModal";


const useStyles = makeStyles((theme: Theme) => createStyles({
	issueCard: {
		padding: theme.spacing(2),
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
		},
		fontSize: '16px',
		marginBottom: theme.spacing(2),
	}
})
);


interface UserIssueCardProps {
	issue: INestedIssue,
}


const UserIssuesCard: FC<UserIssueCardProps> = (props) => {
	const classes = useStyles();
	const [isModalOpen, setModalOpen] = useState(false);


	return (
		<>
			<Card className={classes.issueCard} onClick={() => setModalOpen(true)}>
				{props.issue.name}
			</Card>

			<IssueModal
				issue={props.issue}
				isIssueModalOpen={isModalOpen}
				setIssueModalOpen={setModalOpen}
				displayOnly={true}
			/>
		</>
	);
}

export default UserIssuesCard;