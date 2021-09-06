import { Button, Card } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useContext, useState } from 'react';
import { BoardReducerContext } from '../../api/Board/GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';
import { INestedIssue } from '../../types/ModelTypes';
import ConfirmationModal from '../Commons/ConfirmationModal';


const useStyles = makeStyles((theme: Theme) => createStyles({
	cardWrapper: {
		display: 'flex',
		width: '100px',
		height: '33px',
		backgroundColor: theme.palette.primary.light,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: theme.spacing(1),
	},
	button: {
		width: '100%',
		textTransform: 'none',
		fontWeight: 'bold',
		"&:hover": {
			fontWeight: 'bold',
		}
	},
	text: {
		fontSize: '14px',
		color: theme.palette.secondary.main,
	},
}));


interface ArchivizeProps {
	issue: INestedIssue,
	archivizeIssue: () => void,
}


const ArchivizeButton: FC<ArchivizeProps> = (props) => {
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);
	const { dispatch } = useContext(BoardReducerContext);


	function handleSubmit() {
		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
		};

		dispatch({ type: ActionTypes.ArchivizeIssue, payload: payload });
		props.archivizeIssue();
	}


	return (
		<>
			<Card className={classes.cardWrapper}>
				<Button className={classes.button} onClick={() => {setModalOpen(true)}}>
					<div className={classes.text}>
						Archivize
					</div>
				</Button>

				<ConfirmationModal
					handleConfirm={handleSubmit}
					open={modalOpen}
					setOpen={setModalOpen}
				/>
			</Card>
		</>
	);
}


export default ArchivizeButton;