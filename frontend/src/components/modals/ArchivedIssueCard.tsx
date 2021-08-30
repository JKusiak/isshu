import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import IssueContentModal from "./IssueContentModal";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: 140,
			[theme.breakpoints.down('xs')]: {
				height: 100,
			},
			width: 'auto',
			transition: 'all .12s linear',
			boxShadow: theme.shadows[2],
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				boxShadow: theme.shadows[5],
				cursor: 'pointer',
			},
		},
		cardContent: {
			textAlign: 'center',
			width: '100%',
			maxWidth: '260px',
			overflow: 'hidden',
		},
		cardName: {
			color: theme.palette.secondary.main,
		},
		cardDescription: {
			color: theme.palette.secondary.main,
		},
	})
);


interface ArchivedIssueCardProps {
	issue: INestedIssue,
}


const ArchivedIssueCard: FC<ArchivedIssueCardProps> = (props) => {
	const classes = useStyles();
	const [isModalOpen, setModalOpen] = useState(false);


	return (
		<>
			<Card className={classes.cardContainer} onClick={() => setModalOpen(true)}>
				<CardContent className={classes.cardContent}>
					<Typography className={classes.cardName} component="h5" variant="h5">
						{props.issue.name}
					</Typography>
					<Typography className={classes.cardDescription}>
						{props.issue.description}
					</Typography>
				</CardContent>
			</Card>

			<IssueContentModal 
				issue={props.issue} 
				isIssueModalOpen={isModalOpen} 
				setIssueModalOpen={setModalOpen}
			/>
		</>

	);
}

export default ArchivedIssueCard;