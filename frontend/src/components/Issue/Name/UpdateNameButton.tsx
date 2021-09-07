import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import NameText from './NameText';


const useStyles = makeStyles((theme: Theme) => createStyles({
	nameContainer: {
		gridArea: 'header',
		justifySelf: 'start',
		width: '67%',
		paddingRight: theme.spacing(2),
	},
	form: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	inputField: {
		width: '100%',
		height: '100%',
		"& .MuiOutlinedInput-root": {
			height: '100%',
			color: theme.palette.secondary.main,
			"& .MuiOutlinedInput-notchedOutline": {
				height: 'auto',
				borderRadius: '6px',
				borderColor: theme.palette.secondary.light,
			},
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				height: 'auto',
				borderColor: theme.palette.secondary.light,
				borderWidth: "2px",
			},
		},
		"& .MuiOutlinedInput-input": {
			fontSize: 24,
			padding: 10,
			fontWeight: 'bold',
		},
	},
}));


interface UpdateNameButtonProps {
	issue: INestedIssue,
	tempName: string,
	setTempName: React.Dispatch<React.SetStateAction<string>>,
	permName: string,
	onSubmit: (e: any) => void,
}


const UpdateNameButton: FC<UpdateNameButtonProps> = (props) => {
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
			<div className={classes.nameContainer} onClick={() => setUpdateMode(true)}>
				{updateMode &&
					<form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
						<TextField
							className={classes.inputField}
							required
							autoFocus
							size="small"
							variant='outlined'
							name="issueName"
							id="issueName"
							value={props.tempName}
							autoComplete="issue-name"
							onChange={e => {
								props.setTempName(e.target.value);
							}}
						/>
					</form>
				}

				{!updateMode &&
					<NameText
						issue={props.issue}
						permName={props.permName}
					/>
				}
			</div>
		</ClickAwayListener>
	);
}


export default UpdateNameButton;