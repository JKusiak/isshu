import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { FC, Fragment, useEffect, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import UserIssuesCard from "./UserIssueCard";


const useStyles = makeStyles((theme: Theme) => createStyles({
	statistics: {
		fontSize: '16px',
		marginBottom: theme.spacing(8),
	},
	userStat: {
		marginRight: theme.spacing(4),
	},
	container: {
		display: 'grid',
		justifyContent: 'center',
		width: '70%',
		[theme.breakpoints.up('md')]: {
			gridTemplateColumns: '1fr 1fr',
		},
		[theme.breakpoints.down('sm')]: {
			gridTemplateRows: '1fr 1fr',
		},
	},
	column: {
		textAlign: 'center',
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(8),
		},
		[theme.breakpoints.down('sm')]: {
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
	const [totalCreated, setCreated] = useState<number>(0);
	const [totalTaken, setTaken] = useState<number>(0);
	const [totalCompleted, setCompleted] = useState<number>(0);
	const [totalArchived, setArchived] = useState<number>(0);

	useEffect(() => {
		for (let issue of props.issuesCreated) {
			setCreated(prev => prev + 1);
			if (!issue.columnId) {
				setArchived(prev => prev + 1);
			}
		}
		
	}, []);

	useEffect(() => {
		for (let issue of props.issuesTaken) {
			setTaken(prev => prev + 1);
			if (issue.isFinished) {
				setCompleted(prev => prev + 1);
			}
			if (!issue.columnId) {
				setArchived(prev => prev + 1);
			}
		}
	}, []);

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
		<>
			<div className={classes.statistics}>
				<span className={classes.userStat}>
					Total created: <b>{totalCreated}</b>
				</span>
				<span className={classes.userStat}>
					Total taken: <b>{totalTaken}</b>
				</span>
				<span className={classes.userStat}>
					Total completed: <b>{totalCompleted}</b>
				</span>
				<span className={classes.userStat}>
					Total archived: <b>{totalArchived}</b>
				</span>
			</div>
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
		</>
	);
}

export default UserIssuesGallery;