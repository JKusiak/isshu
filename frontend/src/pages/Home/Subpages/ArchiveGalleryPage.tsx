import { InputAdornment, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { FC, Fragment, useState } from "react";
import ArchivedIssueCard from "../../../components/Issue/ArchivedIssueCard";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: 'bold',
			fontSize: '28px',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(2),
		},
		searchWrapper: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: theme.spacing(5),
		},
		searchField: {
			width: '350px',
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
			gridTemplateColumns: 'repeat(auto-fill, 400px)',
			[theme.breakpoints.down('xs')]: {
				gridTemplateColumns: 'repeat(auto-fill, 250px)',
			},
			marginRight: theme.spacing(8),
			marginLeft: theme.spacing(8),
			marginBottom: theme.spacing(4),
		},

	})
);


interface ArchiveGalleryProps {
	archivedIssues: any;
}


const ArchiveGalleryPage: FC<ArchiveGalleryProps> = (props) => {
	const classes = useStyles();
	const [query, setQuery] = useState('');


	function search(issues: any) {
		return issues.filter((issue: any) => {
			if (query === '') return issue;

			if (issue.name.toLowerCase().includes(query.toLowerCase()) || (issue.description && issue.description.toLowerCase().includes(query.toLowerCase()))) {
				return issue;
			}
			return null;
		});
	}


	function displayIssues() {
		return (
			search(props.archivedIssues).map((issue: any) => {
				return (
					<Fragment key={issue._id}>
						<ArchivedIssueCard issue={issue} />
					</Fragment>
				);
			})
		)
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
								<SearchIcon />
							</InputAdornment>
					}}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</div>
			<div className={classes.issuesGrid}>
				{displayIssues()}
			</div>
		</>
	);
}

export default ArchiveGalleryPage;
