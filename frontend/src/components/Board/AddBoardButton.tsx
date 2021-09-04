import { ClickAwayListener, IconButton, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddOutlined';
import React, { FC, SetStateAction } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	boardCard: {
		display: 'flex',
		minHeight: '300px',
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'all .12s linear',
		backgroundColor: theme.palette.primary.light,
		boxShadow: theme.shadows[2],
		"&:hover": {
			boxShadow: theme.shadows[5],
			cursor: 'pointer',
		},
	},
	inputField: {
		"& .MuiOutlinedInput-root": {
			color: theme.palette.secondary.main,
			"& .MuiOutlinedInput-notchedOutline": {
				borderRadius: '10px',
				borderColor: theme.palette.secondary.light,
			},
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.secondary.light,
				borderWidth: "2px",
			}
		},
	},
	icon: {
		fontSize: '35px',
		color: theme.palette.secondary.main,
	},

}));

interface AddBoardModalProps {
	onSubmit: (e: React.SyntheticEvent<Element, Event>) => void,
	addMode: boolean,
	setAddMode: React.Dispatch<SetStateAction<boolean>>,
	setBoardName: React.Dispatch<SetStateAction<string>>,
}


const AddBoardModal: FC<AddBoardModalProps> = (props) => {
	const classes = useStyles();


	return (
		<>
			<div onClick={() => props.setAddMode(true)}>
				<ClickAwayListener onClickAway={() => props.setAddMode(false)}>
					<Card className={classes.boardCard}>
						<Typography component="h5" variant="h5">
							{props.addMode &&
								<form onSubmit={props.onSubmit} autoComplete="off">
									<TextField
										className={classes.inputField}
										required
										autoFocus
										variant='outlined'
										name="boardName"
										id="boardName"
										placeholder="Board name"
										autoComplete="board-name"
										onChange={e => {
											props.setBoardName(e.target.value);
										}}
									/>
									<IconButton type="submit">
										<AddIcon className={classes.icon} />
									</IconButton>
								</form>
							}
							{!props.addMode &&
								<AddIcon className={classes.icon} />
							}
						</Typography>
					</Card>
				</ClickAwayListener>
			</div>
		</>
	);
}

export default AddBoardModal;