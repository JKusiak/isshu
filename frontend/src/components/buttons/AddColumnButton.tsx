import { ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, SetStateAction, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	card: {
		flexShrink: 0,
		width: 'auto',
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.light,
	},
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputField: {
		width: 'auto',
		marginLeft: theme.spacing(1),
		color: theme.palette.secondary.main,
	},
	iconButton: {
		
	},
	icon: {
		transform: 'scale(1)',
		color: theme.palette.secondary.main,
	},
}));

interface AddColumnButtonProps {
	onSubmit: (e: React.SyntheticEvent<Element, Event>) => void,
	setColumnName: React.Dispatch<SetStateAction<string>>,
}


const AddColumnButton: FC<AddColumnButtonProps> = (props) => {
	const classes = useStyles();
	const [addMode, setAddMode] = useState<boolean>(false);


	function handleSubmit(e: any) {
		e.preventDefault();

		setAddMode(false);
		props.onSubmit(e);
	}


	return (
		<>
			<div onClick={() => setAddMode(true)}>
				<ClickAwayListener onClickAway={() => setAddMode(false)}>
					<Card className={classes.card}>
						{addMode &&
							<form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
								<InputBase
									className={classes.inputField}
									required
									autoFocus
									name="columnName"
									id="columnName"
									placeholder="Column name"
									autoComplete="column-name"
									onChange={e => {
										props.setColumnName(e.target.value);
									}}
								/>
								<IconButton type="submit">
									<AddIcon className={classes.icon} />
								</IconButton>
							</form>
						}
						{!addMode &&
							<IconButton className={classes.iconButton}>
								<AddIcon className={classes.icon} />
							</IconButton>
						}
					</Card>
				</ClickAwayListener>
			</div>
		</>
	);
}

export default AddColumnButton;