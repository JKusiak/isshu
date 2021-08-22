import { createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { FC, Fragment, useContext, useState } from 'react';
import { UserTemplate } from '../../types/ModelContentTemplate';
import { INestedIssue, INestedUser, IUser } from '../../types/ModelTypes';
import DeleteContributorButton from '../buttons/issueButtons/DeleteContributorButton';
import { BoardReducerContext } from '../functional/GetBoard';
import { ActionTypes } from '../reducers/BoardReducer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contributorsContainer: {
      	marginBottom: theme.spacing(4),
    },
    headline: {
        fontSize: '16px',
        fontWeight: 'bold',
		color: theme.palette.secondary.main,
		marginBottom: theme.spacing(1),
    },
	autocomplete: {
		width: '100%',
		height: '100%',
		// text within the search
		"& .MuiAutocomplete-input": {
			fontSize: '14px',
		},
		"& .MuiAutocomplete-popper.MuiAutocomplete-paper": {
			// "& *": {
				backgroundColor: theme.palette.primary.light,
			// }
	  	},
		"& .MuiAutocomplete-endAdornment": {
			"& *": {
				color: theme.palette.secondary.main,
			}
		}
	},
	formContainer: {
		marginBottom: theme.spacing(2),
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
	dropdownPaper: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.secondary.main,
	},
	contributor: {
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.secondary.main,
	},
  })
);


interface IssueContributorsGalleryProps {
	projectContributors: [IUser],
	issue: INestedIssue,
	updateContributors: () => void,
}


const IssueContributorsGallery: FC<IssueContributorsGalleryProps> = (props) => {
    const classes = useStyles();
	const [newContributor, setNewContributor] = useState<INestedUser|null>(UserTemplate);
	const [resetAutocomplete, setResetAutocomplete] = useState<boolean>(false);
    const { dispatch } = useContext(BoardReducerContext);
	const issueContributorsToId = props.issue.contributors.map(contributor => contributor._id);

	function displayIssueContributors() {
		return(props.issue.contributors.map((contributor: INestedUser, index: number) => {
            return(
                <Fragment key={index}>
					<div className={classes.contributor}>
						{`${contributor.name} ${contributor.surname}`}
						<DeleteContributorButton 
							issue={props.issue}
							clickedContributor={contributor}
							updateContributors={props.updateContributors}
						/>
					</div>
                </Fragment>
            );
        }));
	}


	function handleSubmit(e:React.SyntheticEvent) {
		e.preventDefault();
		let issueContributors:(INestedUser | null)[] = [...props.issue.contributors];

		if(issueContributors[issueContributors.length - 1] !== newContributor) {
			issueContributors =  [...props.issue.contributors, newContributor];

			const payload = {
				columnId: props.issue.columnId,
				issueId: props.issue._id,
				modified: {
					contributors: issueContributors,
				},
			}
			
			dispatch({type: ActionTypes.UpdateIssue, payload: payload})
			props.updateContributors();
		}

		setResetAutocomplete(!resetAutocomplete);
	}


    return (
      <div className={classes.contributorsContainer}>
        <Typography className={classes.headline} component="h5" variant="h5">
            Contributors
        </Typography>
		<form className={classes.formContainer} onSubmit={handleSubmit} autoComplete="off">
			<Autocomplete
				key={resetAutocomplete.toString()}
				className={classes.autocomplete}
				classes={{ paper: classes.dropdownPaper }}
				id="contributors-to-ticket"
				options={props.projectContributors}
				getOptionLabel={option => `${option.name} ${option.surname}`}
				getOptionDisabled={(option) => issueContributorsToId.includes(option._id)}
				onChange={(e, value) => setNewContributor(value)}
				renderInput={(params) => 
					<TextField
						className={classes.inputField} 
						{...params} 
						placeholder="Search contributors..." 
						variant='outlined'
					/>}
			/>
		</form>
		
		{displayIssueContributors()}
      </div>
    );
}

export default IssueContributorsGallery;