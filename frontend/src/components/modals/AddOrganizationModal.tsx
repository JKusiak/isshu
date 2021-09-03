import { Backdrop, Button, Card, CardContent, createStyles, Fade, makeStyles, Modal, TextField, Theme, Typography } from "@material-ui/core";
import InsertPhotoIcon from '@material-ui/icons/InsertPhotoOutlined';
import { FC, useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardContainer: {
			height: '100px',
			width: '250px',
			transition: 'all .12s linear',
			boxShadow: theme.shadows[2],
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				boxShadow: theme.shadows[5],
				cursor: 'pointer',
			},
			marginBottom: theme.spacing(4),
		},
		cardText: {
			color: theme.palette.secondary.main,
			textAlign: 'center',
			// fontWeight: 'bold',
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			[theme.breakpoints.up('sm')]: {
				width: '35vw',
				minWidth: '430px',
			},
			[theme.breakpoints.down('xs')]: {
				width: '95vw',
				minWidth: 0,
			},
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
			color: theme.palette.secondary.main,
			textAlign: 'center',
		},
		imagePlaceholder: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		placeholderIcon: {
			width: '100px',
			height: '100px',
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

	})
);


interface AddOrganizationModalProps {
	onSubmit: (name: string) => void,
}


const AddOrganizationModal: FC<AddOrganizationModalProps> = (props) => {
	const classes = useStyles();
	const [isModalOpen, setModalOpen] = useState(false);
	const [orgName, setOrgName] = useState('');


	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		props.onSubmit(orgName);
		setModalOpen(false);
	}


	return (
		<>
			<Card className={classes.cardContainer} onClick={() => setModalOpen(true)}>
				<CardContent>
					<Typography className={classes.cardText} component="h5" variant="h5">
						Create your organization
					</Typography>
				</CardContent>
			</Card>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isModalOpen}
				onClose={() => setModalOpen(false)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isModalOpen}>
					<div className={classes.paper}>
						<Typography className={classes.header} component="h1" variant="h4">
							Create organization
						</Typography>
						<div className={classes.imagePlaceholder}>
							<InsertPhotoIcon className={classes.placeholderIcon} />
						</div>

						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								className={classes.inputField}
								required
								fullWidth
								autoFocus
								variant="outlined"
								name="organizationName"
								id="organizationName"
								placeholder="Organization Name"
								autoComplete="organization-name"
								onChange={(e) => {
									setOrgName(e.target.value);
								}}
							/>

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
		</>

	);
}

export default AddOrganizationModal;