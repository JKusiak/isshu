import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { FC, useState } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) => createStyles({
	nameContainer: {
		display: 'flex',
		marginBottom: theme.spacing(2),
		width: '100%',
		overflow: 'hidden',
	},
	nameText: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: '24px',
		"&:hover": {
				cursor: 'pointer'
		},
	},
	form: {
		width: '100%',
	},
	inputField: {
		width: '100%',
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				height: 'auto',
				borderColor: theme.palette.secondary.light,
				borderRadius: '10px',
				borderWidth: "1px",
			},
			"&.Mui-focused fieldset": {
				height: 'auto',
				borderColor: theme.palette.secondary.light,
				borderRadius: '10px',
				borderWidth: "1px",
			},
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
	if(updateMode) {
		props.onSubmit(e);
	}  
	setUpdateMode(false);
}


return (
	<ClickAwayListener onClickAway={handleSubmit}>
		<div className={classes.nameContainer}>
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
						inputProps={{style: {fontSize: 24, padding: 10, fontWeight: 'bold',}}}
						onChange={e => {
							props.setTempName(e.target.value);
						}}
					/>
				</form>     
			}

			{!updateMode &&
				<div 
					className={classes.nameText} 
					onClick={() => setUpdateMode(true)} 
					style={{
							textDecoration: props.issue.isFinished? 'line-through' : 'none',
					}}>
						{props.permName}
						{props.issue.isFinished && <CheckIcon />}
				</div>
				
			}
		</div>
	</ClickAwayListener>       
);
}


export default UpdateNameButton;