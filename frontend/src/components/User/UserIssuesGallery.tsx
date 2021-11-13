import { Card, createStyles, makeStyles, Theme } from "@material-ui/core";
import { FC, Fragment } from "react";
import { IIssue, INestedIssue } from "../../types/ModelTypes";
import UserIssuesCard from "./UserIssueCard";


const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: 'grid',
		justifyContent: 'center',
		width: '70%',
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: '1fr 1fr',
		},
		[theme.breakpoints.down('xs')]: {
			gridTemplateRows: '1fr 1fr',
		},
	},
	column: {
		textAlign: 'center',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(8),
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: theme.spacing(4),
		},
	},
	header: {
		fontSize: '24px',
		marginBottom: theme.spacing(2),
	},

}));


interface UserIssuesGalleryProps {
	issuesTaken: [INestedIssue];
	issuesCreated: [INestedIssue];
}


const UserIssuesGallery: FC<UserIssuesGalleryProps> = (props) => {
	const classes = useStyles();

	function displayIssues(type: 'issuesTaken' | 'issuesCreated') {
		if (props[type].length > 0) {
			return (props[type].map((issue: INestedIssue) => {
				// only show active issues
				if (!issue.columnId) return;
				return (
					<Fragment key={issue._id}>
						<UserIssuesCard issue={issue} />
					</Fragment>
				);
			}));
		} else {
			return (
				<p>No issues yet</p>
			);
		}
	}


	return (
		<div className={classes.container}>
			<div className={classes.column}>
				<div className={classes.header}>Active issues created: </div>
				{displayIssues('issuesCreated')}
			</div>

			<div className={classes.column}>
				<div className={classes.header}> Active issues taken:</div>
				{displayIssues('issuesTaken')}
			</div>
		</div>
	);
}

export default UserIssuesGallery;