import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useContext } from "react";
import { Link } from 'react-router-dom';
import DeleteMember from "../../api/Organization/DeleteMember";
import { AuthUserContext } from "../../App";
import { INestedUser } from "../../types/ModelTypes";



const useStyles = makeStyles((theme: Theme) => createStyles({
	cardContainer: {
		display: 'flex',
		height: 140,
		[theme.breakpoints.down('xs')]: {
			height: 100,
		},
		width: 'auto',
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		backgroundColor: theme.palette.primary.light,
		"&:hover": {
			boxShadow: theme.shadows[5],
		},
	},
	cardContent: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		color: theme.palette.secondary.main,
		maxWidth: '260px',
	},
	name: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '18px',
		},
		overflow: 'hidden',
		color: theme.palette.secondary.main,
	},
	description: {
		overflow: 'hidden',
		color: theme.palette.secondary.main,
	},
	image: {
		flex: 'none',
		marginRight: 'auto',
		height: 140,
		width: 140,
		[theme.breakpoints.down('xs')]: {
			height: 100,
			width: 100,
		},
		filter: 'blur(0.5px)'
	},
}
));


interface MemberProps {
	member: INestedUser,
	imageExists: boolean,
	imageUrl: string,
}


const MemberCard: FC<MemberProps> = (props) => {
	const classes = useStyles();
	const { loggedInUser } = useContext(AuthUserContext);


	return (
		<>
			<Card className={classes.cardContainer}>
				<CardMedia
					className={classes.image}
					component={Link} to={`/user/${props.member._id}`}
					image={props.imageUrl}
					title="Member profile photo"
				/>

				<CardContent className={classes.cardContent} component={Link} to={`/user/${props.member._id}`}>
					<Typography className={classes.name} component="h5" variant="h5">
						{props.member.name} {props.member.surname}
					</Typography>
				</CardContent>

				<CardActions>
					{loggedInUser._id !== props.member._id &&
						<DeleteMember member={props.member} />
					}
				</CardActions>
			</Card>

		</>
	);
}

export default MemberCard;