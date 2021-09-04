import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		width: '100%',
	},
	form: {
		width: '100%',
	},
	inputField: {
		width: '100%',
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
		"& .MuiOutlinedInput-input": {
			fontSize: 30,
			padding: 10,
			fontWeight: 'bold',
		},
	},
	nameText: {
		textAlign: 'center',
		"&:hover": {
			cursor: 'pointer'
		}
	}
}));


interface BoardNameButtonProps {
	tempBoardName: string,
	setTempBoardName: React.Dispatch<React.SetStateAction<string>>,
	permBoardName: string,
	onSubmit: (e: any) => void,
}


const BoardNameButton: FC<BoardNameButtonProps> = (props) => {
	const classes = useStyles();
	const [updateMode, setUpdateMode] = useState<boolean>(false);


	function handleSubmit(e: any) {
		if (updateMode) {
			props.onSubmit(e);
		}
		setUpdateMode(false);
	}


	return (
		<ClickAwayListener onClickAway={handleSubmit}>
			<div className={classes.container} onClick={() => setUpdateMode(true)}>
				{updateMode &&
					<form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
						<TextField
							className={classes.inputField}
							required
							autoFocus
							variant='outlined'
							name="boardName"
							id="boardName"
							value={props.tempBoardName}
							autoComplete="board-name"
							onChange={e => {
								props.setTempBoardName(e.target.value);
							}}
						/>
					</form>
				}

				{!updateMode &&
					<div className={classes.nameText}>{props.permBoardName}</div>
				}
			</div>
		</ClickAwayListener>
	);
}


export default BoardNameButton;