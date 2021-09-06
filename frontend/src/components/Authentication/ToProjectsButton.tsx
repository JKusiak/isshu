import { Card } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => createStyles({
	buttonLink: {
		textDecoration: 'none',
	},
	toProjectsCard: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '200px',
		height: '40px',
		borderRadius: '10px',
		background: 'white',
		fontSize: '14px',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.secondary.main,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			boxShadow: theme.shadows[5],
		},
	},
}));


function ButtonToProjects() {
	const classes = useStyles();


	return (
		<div>
			<Link className={classes.buttonLink} to='/home/projects'>
				<Card className={classes.toProjectsCard}>
					YOUR PROJECTS
				</Card>
			</Link>

		</div>
	);
}

export default ButtonToProjects;