import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BackIcon from '@material-ui/icons/ChevronLeftOutlined';
import { FC, Fragment, useContext } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useHistory, useParams } from "react-router-dom";
import { INestedBoard, INestedColumn } from "../types/ModelTypes";
import ColumnData from "./ColumnData";
import AddColumn from "./functional/AddColumn";
import DeleteBoard from "./functional/DeleteBoard";
import { BoardReducerContext } from "./functional/GetBoard";
import UpdateBoard from "./functional/UpdateBoard";
import { ActionTypes } from "./reducers/BoardReducer";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		navigation: {
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%',
			padding: theme.spacing(2),
			[theme.breakpoints.down('xs')]: {
				width: '90%',
				padding: 0,
			},
			marginBottom: theme.spacing(8),
		},
		backButton: {
			padding: theme.spacing(2),
			[theme.breakpoints.down('xs')]: {
				paddingRight: 0,
				paddingLeft: 0,
			},
		},
		boardTitle: {
			fontSize: '36px',
			[theme.breakpoints.down('xs')]: {
				fontSize: '28px',
			},
			color: theme.palette.secondary.main,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '30%',
			overflow: 'hidden',
		},
		backIcon: {
			transform: 'scale(2.5)',
			color: theme.palette.secondary.main,
			[theme.breakpoints.down('xs')]: {
				transform: 'scale(1.8)',
			},
		},
		wrapper: {
			display: 'flex',
			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
			},
			justifyContent: 'center',
		},
		container: {
			display: "flex",
			marginLeft: theme.spacing(8),
			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
				marginLeft: 0,
			},
		},
	}
	));


interface BoardDataProps {
	board: INestedBoard,
	changeColumn: (newColumnId: string, issueId: string) => void,
}


const BoardData: FC<BoardDataProps> = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { projectId } = useParams<{ projectId: string }>();
	const { dispatch } = useContext(BoardReducerContext);

	function handleGoBack() {
		history.push(`/project/${projectId}`);
	}


	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;
		if (!destination) return;

		if (source.droppableId !== destination.droppableId) {
			const oldColumnId = source.droppableId;
			const newColumnId = destination.droppableId;
			const payload = {
				oldColumnId: oldColumnId,
				newColumnId: newColumnId,
				issueId: draggableId,
			}

			dispatch({ type: ActionTypes.ChangeColumns, payload: payload });
			props.changeColumn(destination.droppableId, draggableId);
		}
		// else if (source.droppableId === destination.droppableId){
		//       const chosenColumn = ensure(props.board.columns.find(column => column._id === source.droppableId));
		//       const reorderedIssues = reorderColumn(chosenColumn.issues, source.index, destination.index);
		//       const payload = {
		//             columnId: source.droppableId,
		//             reorderedIssues: reorderedIssues,
		//       }

		//       dispatch({type: ActionTypes.ReorderColumn, payload: payload});
		// } 
		else {
			return;
		}
	};


	// function reorderColumn(issues: [INestedIssue], startIndex: number, endIndex: number) {
	//       const [removed] = issues.splice(startIndex, 1);
	//       issues.splice(endIndex, 0, removed);       
	//       return issues;
	// };



	function displayBoardContent() {
		if (props.board.columns !== undefined && props.board.columns.length > 0) {
			return (
				<div className={classes.container}>
					<DragDropContext onDragEnd={result => onDragEnd(result)}>
						{props.board.columns.map((column: INestedColumn, index: number) => {
							return (
								<Fragment key={index}>
									<ColumnData column={column} />
								</Fragment>
							);
						})}
					</DragDropContext>
				</div>
			);
		}
	}


	return (
		<>
			<div className={classes.navigation}>
				<IconButton className={classes.backButton} onClick={handleGoBack}>
					<BackIcon className={classes.backIcon} />
				</IconButton>

				<div className={classes.boardTitle}>
					<UpdateBoard boardName={props.board.name} />
				</div>

				<div>
					<DeleteBoard />
				</div>
			</div>

			<div className={classes.wrapper}>
				{displayBoardContent()}
				<AddColumn />
			</div>
		</>
	);
}

export default BoardData;