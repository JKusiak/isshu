import { ClickAwayListener, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	inputField: {
		width: '250px',
		"& .MuiOutlinedInput-root": {
			color: theme.palette.secondary.main,
			"& .MuiOutlinedInput-notchedOutline": { 
				borderRadius: '6px',
				borderColor: theme.palette.secondary.light,
			}, 
			"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
				borderColor: theme.palette.secondary.light,
				borderWidth: "2px",
			}
		},
		"& .MuiOutlinedInput-input": {
			marginLeft: theme.spacing(0.5),
			fontSize: 30, 
			padding: 5 
		},
	},
	headerText: {
		fontWeight: 'bold',
		color: theme.palette.secondary.main,
		"&:hover": {
			cursor: 'pointer',
		}
	},
}));


interface OrganizationNameButtonProps {
	tempOrgName: string,
	setTempOrgName: React.Dispatch<React.SetStateAction<string>>,
	onSubmit: (e: any) => void,
}


const OrganizationNameButton: FC<OrganizationNameButtonProps> = (props) => {
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
			<div onClick={() => setUpdateMode(true)}>
				{updateMode &&
					<form onSubmit={handleSubmit} autoComplete="off">
						<TextField
							className={classes.inputField}
							required
							autoFocus
							size="small"
							variant='outlined'
							name="organizationName"
							id="organizationName"
							value={props.tempOrgName}
							autoComplete="organization-name"
							onChange={e => {
								if (e.target.value !== '') {
									props.setTempOrgName(e.target.value);
								} else {
									props.setTempOrgName('Enter value');
								}
							}}
						/>
					</form>
				}

				{!updateMode &&
					<Typography className={classes.headerText} component="h1" variant="h4">
						{props.tempOrgName}
					</Typography>
				}
			</div>
		</ClickAwayListener>
	);
}


export default OrganizationNameButton;