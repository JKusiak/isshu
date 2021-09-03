import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { FC, SetStateAction, useState } from 'react';
import { IUser } from '../../types/ModelTypes';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		searchWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		formContainer: {
			width: '350px',
			marginBottom: theme.spacing(5),
		},
		autocomplete: {
			width: '100%',
			height: '100%',
			// text within the search
			"& .MuiAutocomplete-input": {
				fontSize: '16px',
			},
			"& .MuiAutocomplete-popper.MuiAutocomplete-paper": {
				backgroundColor: theme.palette.primary.light,
			},
			"& .MuiAutocomplete-endAdornment": {
				display: 'none',
			}
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
		dropdownPaper: {
			backgroundColor: theme.palette.primary.light,
			color: theme.palette.secondary.main,
		},
		contributor: {
			display: 'flex',
			alignItems: 'center',
			color: theme.palette.secondary.main,
		},
		invitePrompt: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color: 'green',
			fontSize: '16px',
			fontWeight: 'bold',
			marginTop: theme.spacing(5),
		}
	})
);


interface AddMemberButtonProps {
	allUsers: any,
	query: string,
	setQuery: React.Dispatch<SetStateAction<string>>,
	user: IUser,
	setUser: React.Dispatch<SetStateAction<IUser>>,
	sendMemberInvite: () => void,
}


const AddMemberButton: FC<AddMemberButtonProps> = (props) => {
	const classes = useStyles();
	const [resetAutocomplete, setResetAutocomplete] = useState<boolean>(false);
	const [inviteSent, setInviteSent] = useState(false);


	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		if (props.user._id !== '') {
			props.sendMemberInvite();
			setInviteSent(true);
		}
		setResetAutocomplete(!resetAutocomplete);
	}


	return (
		<>

			<div className={classes.searchWrapper}>
				<form className={classes.formContainer} onSubmit={handleSubmit} autoComplete="off">
					<Autocomplete
						key={resetAutocomplete.toString()}
						className={classes.autocomplete}
						classes={{ paper: classes.dropdownPaper }}
						onInputChange={((e, value) => {
							props.setQuery(value);
							setInviteSent(false);
						})}
						open={props.query.length >= 3}
						onChange={((e, value) => { props.setUser(value); props.setQuery('') })}
						options={props.allUsers}
						getOptionLabel={(option: any) => `${option.name} ${option.surname} ${option.email} `}
						renderInput={(params) =>
							<TextField
								className={classes.inputField}
								{...params}
								placeholder="Search all users..."
								variant='outlined'
							/>}
					/>
					{inviteSent &&
						<div className={classes.invitePrompt}>Invite sent</div>
					}
				</form>
			</div>

		</>
	);
}

export default AddMemberButton;