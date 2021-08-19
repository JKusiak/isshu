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
		marginBottom: theme.spacing(1),
    },
	autocomplete: {
		width: '100%',
		height: '100%',
		// text within the search
		"& .MuiAutocomplete-input": {
			fontSize: '14px',
		},
		"& .MuiAutocomplete-option": {
			"& *": {
				color: 'red',
				fontSize: '14px',
			}
		}
		
	},
	formContainer: {
		marginBottom: theme.spacing(2),
	},
	inputField: {
		width: '100%',
		height: 'auto',
		"& .MuiOutlinedInput-root": {
			height: '100%',
			"& fieldset": {
					height: 'auto',
					borderColor: '#cfd2d4',
					borderRadius: '6px',
					borderWidth: "1px",
			},
			"&.Mui-focused fieldset": {
					height: 'auto',
					borderColor: theme.palette.secondary.light,
					borderRadius: '6px',
					borderWidth: "1px",
			},
		},
	},
	contributor: {
		display: 'flex',
		alignItems: 'center',
	},
	credentials: {
		
	}
  })
);


interface IssueContributorsGalleryProps {
	projectContributors: [IUser],
	issue: INestedIssue,
	updateContributors: () => void,
}


const IssueContributorsGallery: FC<IssueContributorsGalleryProps> = (props) => {
    const classes = useStyles();
	const [contributor, setContributor] = useState<INestedUser|null>(UserTemplate);
	const [resetAutocomplete, setResetAutocomplete] = useState<boolean>(false);
    const { dispatch } = useContext(BoardReducerContext);
	const issueContributorsToId = props.issue.contributors.map(contributor => contributor._id);

	function displayIssueContributors() {
		return(props.issue.contributors.map((contributor: INestedUser, index: number) => {
            return(
                <Fragment key={index}>
					<div className={classes.contributor}>
						<div className={classes.credentials}>

						</div>
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
		const newContributors = [...props.issue.contributors, contributor];

		const payload = {
			columnId: props.issue.columnId,
			issueId: props.issue._id,
			modified: {
				contributors: newContributors,
			},
		}
		
		dispatch({type: ActionTypes.UpdateIssue, payload: payload})
		props.updateContributors();
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
				id="contributors-to-ticket"
				options={props.projectContributors}
				getOptionLabel={option => `${option.name} ${option.surname}`}
				getOptionDisabled={(option) => issueContributorsToId.includes(option._id)}
				onChange={(e, value) => setContributor(value)}
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