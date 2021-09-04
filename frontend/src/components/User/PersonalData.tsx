import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import ManageUserImage from "../../api/User/ManageUserImage";
import { IUser } from "../../types/ModelTypes";



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		userData: {
			display: 'flex',
			width: "100%",
			marginTop: theme.spacing(2),
		},
		userCredentials: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			marginRight: theme.spacing(4),
			color: theme.palette.secondary.main,
		},
		dataPoint: {
			fontSize: "18px",
			fontWeight: 'bold',
			"&:not(:last-child)": {
				marginBottom: theme.spacing(2),
			}

		}
	})
);


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