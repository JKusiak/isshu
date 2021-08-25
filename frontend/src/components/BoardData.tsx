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
			display: 'grid',
			width: '100%',
			gridTemplateColumns: '1fr 8fr 1fr',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(4),
		},
		backButton: {
			gridColumn: '1',
			justifySelf: 'start',
			alignSelf: 'center',
			marginLeft: theme.spacing(2),
			padding: theme.spacing(2),
		},
		boardTitle: {
			gridColumn: '2',
			justifySelf: 'center',
			alignSelf: 'center',
			fontSize: '36px',
			color: theme.palette.secondary.main,
			display: 'flex',
			width: '30%',
		},
		deleteButton: {
			gridColumn: '3',
			justifySelf: 'end',
			alignSelf: 'center',
			marginRight: theme.spacing(2),
		},
		backIcon: {
			transform: 'scale(2.5)',
			color: theme.palette.secondary.main
		},
		wrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		container: {
			display: "flex",
			marginLeft: theme.spacing(8)
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
	const { projectId } = useParams<{projectId: string}>();
	const { dispatch } = useContext(BoardReducerContext);
	
	function handleGoBack() {
		history.push(`/project/${projectId}`);
	}


	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;
		if(!destination) return;

		if(source.droppableId !== destination.droppableId) {
			const oldColumnId = source.droppableId;
			const newColumnId = destination.droppableId;
			const payload = {
				oldColumnId: oldColumnId,
				newColumnId: newColumnId,
				issueId: draggableId,
			}

			dispatch({type: ActionTypes.ChangeColumns, payload: payload});
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
		if(props.board.columns !== undefined && props.board.columns.length > 0) {
			return(
				<div className={classes.container}>
					<DragDropContext onDragEnd={result => onDragEnd(result)}>           
						{props.board.columns.map((column: INestedColumn, index: number) => {
							return(
								<Fragment key={index}>
									<ColumnData column={column}/> 
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
					<BackIcon className={classes.backIcon}/>
				</IconButton>

				<div className={classes.boardTitle}>
					<UpdateBoard boardName={props.board.name}/>
				</div>

				<div className={classes.deleteButton}>
					<DeleteBoard />
				</div>          
			</div>

			<div className={classes.wrapper}>
				{displayBoardContent()}
				<AddColumn/>
			</div>
		</>
	);
}

export default BoardData;

function dispatch(arg0: { type: any; payload: { oldColumnId: string; newColumnId: string | undefined; issueId: string; }; }) {
	throw new Error("Function not implemented.");
}
