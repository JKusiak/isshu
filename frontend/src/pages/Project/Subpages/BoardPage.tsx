import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment, useContext } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DeleteBoard from "../../../api/Board/DeleteBoard";
import { BoardReducerContext } from "../../../api/Board/GetBoard";
import UpdateBoard from "../../../api/Board/UpdateBoard";
import AddColumn from "../../../api/Column/AddColumn";
import GoBackButton from "../../../components/Board/GoBackButton";
import ColumnData from "../../../components/Column/ColumnData";
import { ActionTypes } from "../../../reducers/BoardReducer";
import { INestedBoard, INestedColumn } from "../../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) => createStyles({
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
	wrapper: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
		justifyContent: 'center',
		marginLeft: theme.spacing(8),
		marginRight: theme.spacing(8),
	},
	container: {
		display: "flex",
		flex: '0 0 0',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			marginLeft: 0,
		},
	},
}
));


interface BoardPageProps {
	board: INestedBoard,
	changeColumn: (newColumnId: string, issueId: string) => void,
}


const BoardPage: FC<BoardPageProps> = (props) => {
	const classes = useStyles();
	const { dispatch } = useContext(BoardReducerContext);


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
			};

			dispatch({ type: ActionTypes.ChangeColumns, payload: payload });
			props.changeColumn(destination.droppableId, draggableId);
		}
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
				<GoBackButton />

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

export default BoardPage;