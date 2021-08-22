import { Button, Card, ClickAwayListener, InputBase, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		width: '100%',	
	},
	card: {
		width: '100%',
		backgroundColor: theme.palette.primary.light,
		boxShadow: theme.shadows[2],
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	inputField: {
		width: 'auto',
		padding: theme.spacing(1),
		marginLeft: theme.spacing(0.5),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		color: theme.palette.secondary.main,
	},
	buttonContainer: {
		width: '100%',
		backgroundColor: theme.palette.primary.main,
		justifyContent: 'flex-start',
		paddingLeft: 0,
		textTransform: 'none',
		
	},
	icon: {
		fontSize: '25px',
		color: theme.palette.secondary.main,
	},
	text: {
		fontSize: '15px',
		color: theme.palette.secondary.main,
	},
}));


interface AddIssueButtonProps {
	onSubmit: (e: React.SyntheticEvent<Element, Event>) => void,
	addMode: boolean,
	setAddMode: React.Dispatch<React.SetStateAction<boolean>>,
	setIssueName: React.Dispatch<React.SetStateAction<string>>,
}


const AddIssueButton: FC<AddIssueButtonProps> = (props) => {
	const classes = useStyles();


	return (
		<>
			<ClickAwayListener onClickAway={() => props.setAddMode(false)}>
				<div className={classes.container}>
					{props.addMode &&
						<Card className={classes.card}>
							<form className={classes.form} onSubmit={props.onSubmit} autoComplete="off">
								<InputBase
									className={classes.inputField}
									required
									autoFocus
									fullWidth
									name="issueName"
									id="issueName"
									placeholder="Enter title for the issue"
									autoComplete="issue-name"
									onChange={e => {
										props.setIssueName(e.target.value);
									}}
								/>
								<Button className={classes.buttonContainer} onClick={props.onSubmit}>
									<AddIcon className={classes.icon} />
									<Typography className={classes.text} component='h6' variant='h6'>
										Create issue
									</Typography>
								</Button>
							</form>
						</Card>
					}
					{!props.addMode &&
						<Button className={classes.buttonContainer} onClick={(() => props.setAddMode(true))}>
							<AddIcon className={classes.icon} />
							<Typography className={classes.text} component='h6' variant='h6'>
								Create issue
							</Typography>
						</Button>
					}
				</div>
			</ClickAwayListener>
		</>
	);
}

export default AddIssueButton;