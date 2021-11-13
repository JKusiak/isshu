import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import ManageUserImage from "../../api/User/ManageUserImage";
import { IUser } from "../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) => createStyles({
	userData: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(8),
	},
	userCredentials: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			alignItems: 'center',
			marginTop: theme.spacing(2),
		},
		width: 'auto',
		color: theme.palette.secondary.main,
	},
	dataPoint: {
		wordWrap: 'break-word',
		fontSize: "16px",
		fontWeight: 'bold',
		"&:not(:last-child)": {
			marginBottom: theme.spacing(2),
		},
	}
}));


interface PersonalDataProps {
	user: IUser;
}


const PersonalData: FC<PersonalDataProps> = (props) => {
	const classes = useStyles();
	const [errorText, setErrorText] = useState('');


	return (
		<div className={classes.userData}>
			<ManageUserImage
				setErrorText={setErrorText}
				user={props.user}
			/>

			<div className={classes.userCredentials}>
				<div className={classes.dataPoint}>Name: {props.user.name}</div>
				<div className={classes.dataPoint}>Surname: {props.user.surname}</div>
				<div className={classes.dataPoint}>Email: {props.user.email}</div>
			</div>
			{errorText}
		</div>

	);
}

export default PersonalData;