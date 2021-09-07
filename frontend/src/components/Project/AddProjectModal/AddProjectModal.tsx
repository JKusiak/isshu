import { Button, Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { Action, ActionTypes } from '../../../reducers/ProjectReducer';
import { IProject } from '../../../types/ModelTypes';
import DateForm from './DateForm';
import DescriptionForm from './DescriptionForm';
import NameForm from './NameForm';


const useStyles = makeStyles((theme: Theme) => createStyles({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		width: '35vw',
		minWidth: '430px',
		height: 'auto',
		backgroundColor: theme.palette.primary.main,
		border: '2px solid',
		borderColor: theme.palette.secondary.main,
		borderRadius: '10px',
		boxShadow: theme.shadows[2],
		padding: theme.spacing(2, 4, 3),
	},

	header: {
		display: 'grid',
		justifyContent: 'center',
		marginBottom: theme.spacing(5),
		color: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
	},
	submit: {
		margin: theme.spacing(3, 0, 3),
		borderRadius: '10px',
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
			backgroundColor: theme.palette.primary.light,
		},
	},
	wrongInput: {
		color: "#C62828",
		textAlign: "center",
	}
}));


interface AddProjectProps {
	onSubmit: (e: React.SyntheticEvent) => void,
	projectState: IProject,
	dispatch: React.Dispatch<Action>,
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	isValid: boolean,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
	errorText: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
}


const AddProjectModal: FC<AddProjectProps> = (props) => {
	const classes = useStyles();


	return (
		<Modal
			className={classes.modal}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={props.isOpen}
			onClose={() => props.setIsOpen(false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.isOpen}>
				<div className={classes.paper}>
					<Typography className={classes.header} component="h1" variant="h4">
						Create project
					</Typography>
					<form className={classes.form} onSubmit={props.onSubmit} autoComplete="off">
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<NameForm
									dispatch={props.dispatch}
									setErrorText={props.setErrorText}
									setIsValid={props.setIsValid}
								/>
							</Grid>
							<Grid item xs={12}>
								<DescriptionForm dispatch={props.dispatch} />
							</Grid>
							<Grid item xs={6}>
								<DateForm
									dispatch={props.dispatch}
									setErrorText={props.setErrorText}
									setIsValid={props.setIsValid}
									value={props.projectState.dateStart}
									minDate={new Date('January 1, 1900')}
									helperText="Beginning date of the project"
									actionType={ActionTypes.UpdateDateStart}
								/>

							</Grid>
							<Grid item xs={6}>
								<DateForm
									dispatch={props.dispatch}
									setErrorText={props.setErrorText}
									setIsValid={props.setIsValid}
									value={props.projectState.dateEnd}
									minDate={props.projectState.dateStart}
									helperText="Ending date of the project"
									actionType={ActionTypes.UpdateDateEnd}
								/>
							</Grid>
						</Grid>

						{!props.isValid && <div className={classes.wrongInput}><p>{props.errorText}</p></div>}

						<Button
							className={classes.submit}
							fullWidth
							type="submit"
							variant="contained"
							color="primary"
						>
							Create
						</Button>
					</form>
				</div>
			</Fade>
		</Modal>
	);
}

export default AddProjectModal;