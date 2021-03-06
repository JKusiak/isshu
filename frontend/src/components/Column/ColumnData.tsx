import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DeleteColumn from "../../api/Column/DeleteColumn";
import UpdateColumn from "../../api/Column/UpdateColumn";
import AddIssue from "../../api/Issue/AddIssue";
import { INestedColumn, INestedIssue } from "../../types/ModelTypes";
import IssueData from "../Issue/IssueData";


const useStyles = makeStyles((theme: Theme) => createStyles({
	columnWrapper: {
		display: "flex",
		flexDirection: "column",
		minHeight: '500px',
		alignItems: "center",
		"&:not(:last-child)": {
			[theme.breakpoints.up('sm')]: {
				borderRight: '1px solid',
				borderRightColor: theme.palette.secondary.light,
			},
			[theme.breakpoints.down('xs')]: {
				borderRight: 'none',
				marginBottom: theme.spacing(4),
			},
		},
	},
	columnHeader: {
		display: 'grid',
		gridTemplateColumns: '0.5fr 1fr 0.5fr',
		width: '100%',
		borderBottom: '0.1px solid',
		borderBottomColor: theme.palette.secondary.light,
	},
	columnName: {
		gridColumn: '2',
		overflow: 'hidden',
		maxHeight: '100%',
		maxWidth: '100%',
		whiteSpace: 'nowrap',
		justifySelf: 'center',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		fontSize: '20px',
		fontWeight: 400,
		color: theme.palette.secondary.light,
	},
	deleteColumnButton: {
		gridColumn: '3',
		justifySelf: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	columnContentWrapper: {
		width: '275px',
		minHeight: '50vh',
		height: 'auto',
		margin: '15px',
	},
}
));


interface ColumnDataProps {
	column: INestedColumn,
}


const ColumnData: FC<ColumnDataProps> = (props) => {
	const classes = useStyles();
	const [showDeleteColumn, setShowDeleteColumn] = useState<boolean>(window.innerWidth < 600 ? true : false);
	const [showAddIssue, setShowAddIssue] = useState<boolean>(window.innerWidth < 600 ? true : false);


	function displayColumnContent() {
		return (
			props.column.issues.map((issue: INestedIssue, index: number) => {
				return (
					<Fragment key={index}>
						<IssueData issue={issue} index={index} />
					</Fragment>
				);
			})
		)
	}


	return (
		<>
			<div className={classes.columnWrapper}>
				<div
					className={classes.columnHeader}
					onMouseOver={() => setShowDeleteColumn(true)}
					onMouseLeave={() => setShowDeleteColumn(false)}
				>
					<div className={classes.columnName}>
						<UpdateColumn column={props.column} />
					</div>

					{showDeleteColumn &&
						<div className={classes.deleteColumnButton}>
							<DeleteColumn column={props.column} />
						</div>
					}
				</div>

				<Droppable droppableId={props.column._id}>
					{provided => {
						return (
							<div
								className={classes.columnContentWrapper}
								onMouseOver={() => setShowAddIssue(true)}
								onMouseLeave={() => setShowAddIssue(false)}
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{displayColumnContent()}
								{provided.placeholder}
								{showAddIssue &&
									<AddIssue column={props.column} />
								}
							</div>
						);
					}}
				</Droppable>
			</div>
		</>
	);
}

export default ColumnData;