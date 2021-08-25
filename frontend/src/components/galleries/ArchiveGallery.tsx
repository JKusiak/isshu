import { Card, CardContent, InputAdornment, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { FC, Fragment, useState } from "react";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(5),
			fontWeight: 'bold',
			color: theme.palette.secondary.main,
		},
		searchWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: theme.spacing(5),
		},
		searchField: {
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
		issuesGrid: {
			display: 'grid',
			justifyContent: 'center',
			gap: theme.spacing(4),
			gridTemplateColumns: 'repeat(auto-fill, minMax(400px, 400px))',
			marginRight: theme.spacing(8),
			marginLeft: theme.spacing(8),
			marginBottom: theme.spacing(4),
		},
		link: {
			textDecoration: 'none',
			color: theme.palette.secondary.main,
		},
		cardContainer: {
			height: 140,
			width: 400,
			transition: 'all .12s linear',
			boxShadow: theme.shadows[2],
			backgroundColor: theme.palette.primary.light,
			"&:hover": {
				boxShadow: theme.shadows[5],
			},
		},
		cardContent: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			maxWidth: '260px',
		},
		name: {
			color: theme.palette.secondary.main,
		},
		issue: {
			color: theme.palette.secondary.main,
		}
	})
);


interface ArchiveGalleryProps {
	archivedIssues: any;
}


const ArchiveGallery: FC<ArchiveGalleryProps> = (props) => {
	const classes = useStyles();
	const [query, setQuery] = useState('');


	function search(issues: any) {
		return issues.filter((issue: any) => {
			if(query === '') return issue;

			if(issue.name.toLowerCase().includes(query.toLowerCase()) || (issue.description && issue.description.toLowerCase().includes(query.toLowerCase()))) {
				return issue
			}
		});
	}


	return (
		<>
			<Typography className={classes.header} component="h1" variant="h4">
				Archivized issues
			</Typography>
			<div className={classes.searchWrapper}>
				<TextField
					className={classes.searchField} 
					placeholder="Search issues..." 
					variant='outlined'
					InputProps={{
						endAdornment: 
							<InputAdornment position="end">
								<SearchIcon/>
							</InputAdornment>
					}}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<div className={classes.issuesGrid}>
				{search(props.archivedIssues).map((issue: any) => {
				return (
					<Fragment key={issue._id}>
						{/* <Link className={classes.link} to={`/project/${project._id}`}> */}
							<Card className={classes.cardContainer}>
								<CardContent className={classes.cardContent}>
									<Typography className={classes.name} component="h5" variant="h5">
										{issue.name}
									</Typography>
									<Typography className={classes.issue} variant="subtitle1" color="textSecondary">
										{issue.description}
									</Typography>
								</CardContent>
								
							</Card>
						{/* </Link> */}
					</Fragment>
				);
			})}
			</div>
		</>
	);
}

export default ArchiveGallery;
