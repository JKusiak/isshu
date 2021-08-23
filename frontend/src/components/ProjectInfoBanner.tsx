import DateFnsUtils from '@date-io/date-fns';
import { Box, ClickAwayListener, IconButton, Menu, MenuItem, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FC, useState } from "react";
import Banner from '../resources/banners/banner.jpg';
import { IProject } from "../types/ModelTypes";
import DeleteProject from "./functional/DeleteProject";
import { Action, ActionTypes } from './reducers/BannerReducer';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
	projectInfoBanner: {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		height: '30vh',
		'&::before': {
			content: '""',    // why for the love of god...
			display: 'block',
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: -1,
			background: `url(${Banner})`,
			backgroundSize: 'cover',
			filter: 'blur(3px) brightness(75%)',
		},
	},
	gridWrapper: {
		display: 'grid',
		width: '100%',
		height: '100%',
		gridTemplateColumns: '1fr 0.5fr 2fr 0.5fr 1fr',
		gridTemplateRows: '1fr 0.5fr 1.5fr 0.5fr 0.5fr 0.5fr 0.5fr',
		gridTemplateAreas:`
			". . . . settings"
			". . projectName . ."
			". description description description ."
			". description description description creator"
			". description description description dateStart"
			". . . . dateEnd"
			". . . . ."`
	},
	nameForm: {
		gridArea: 'projectName',
		justifySelf: 'stretch',
		alignSelf: 'stretch',
	},
	settings: {
		gridArea: 'settings',
		justifySelf: 'end',
		alignSelf: 'center',
		marginRight: '1em',
	},
	description: {
		gridArea: 'description',
		justifySelf: 'stretch',
		alignSelf: 'center',
		margin: '0 3em 0 3em'
	},
	creator: {
		gridArea: 'creator',
		justifySelf: 'end',
		alignSelf: 'center',
		marginRight: '1em',
	},
	dateStart: {
		gridArea: 'dateStart',
		justifySelf: 'end',
		alignSelf: 'center',
		marginRight: '1em',
	},
	dateEnd: {
		gridArea: 'dateEnd',
		justifySelf: 'end',
		alignSelf: 'center',
		marginRight: '1em',
	},
	settingsIcon: {
		fontSize: 25,
		marginRight: '0.5em',
		color: 'white',
		"&:hover": {
			cursor: 'pointer',
		}
	},
	fontColor: {
		"& .MuiInputBase-root.Mui-disabled": {
			color: '#fafafa',
		},
		"& .MuiInputBase-root": {
			color: 'rgba(255, 255, 255, 0.6)',
		},
		"& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
			color: '#fafafa',
		},
		"& .MuiButtonBase-root.MuiIconButton-root": {
			color: 'rgba(255, 255, 255, 0.6)',
		},
	},
	nameStyle: {
		fontSize: '48px',
		fontWeight: 600,
	},
	descriptionStyle: {
		fontSize: '24px',
		fontWeight: 500,
	},
	creatorStyle: {
		fontSize: '0.9vw',
		fontWeight: 600,
	},
	dateStyle: {
		fontSize: '0.9vw',
		fontWeight: 500,
	}
}
));


interface ProjectDataProps {
	projectBannerState: IProject,
	dispatch: React.Dispatch<Action>,
	updateProject: () => void,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [isEditing, setIsEditing] = useState(false);



	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		setIsEditing(false);
		props.updateProject();
	}


	function displayCreator() {
		const creator = props.projectBannerState.creator;
		return(
			<Typography className={classes.fontColor}>
				Creator: {creator.name} {creator.surname}
			</Typography>
		)
	}


	function handleSettingsOpen(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget);
	};


	function handleSettingsClose() {
		setAnchorEl(null);
	};


	function handleEdit() {
		setIsEditing(!isEditing);
		handleSettingsClose();
	}


	function handleEnterMultiline(e: React.KeyboardEvent) {
		if(e.key === "Enter") {
			onSubmit(e);
		}
	}


	function handleClickAway(e: React.MouseEvent<Document, MouseEvent>) {
		if(isEditing === true) {
			setIsEditing(false);
			// type casting like this necessary because of insuficient overlap of types
			onSubmit(e as unknown as React.SyntheticEvent);
		}
	}


	return (
		<>
		<ClickAwayListener onClickAway={handleClickAway}>
		<Box className={classes.projectInfoBanner}>
			<div className={classes.gridWrapper}>
				<form className={classes.nameForm} noValidate autoComplete="off" onSubmit={onSubmit}>
					<TextField
						className={classes.fontColor}
						id="project-name" 
						disabled={!isEditing}
						InputProps={{
							disableUnderline: true,
							classes: {
							input: classes.nameStyle,
							},
						}}
						inputProps={{min: 0, style: { textAlign: 'center' }}}
						value={props.projectBannerState.name || ''}
						onChange={e => {props.dispatch({type: ActionTypes.UpdateName, payload: e.target.value})}}
					/>
				</form>

				<div className={classes.settings}>
					<IconButton  onClick={handleSettingsOpen}>
						<SettingsIcon className={classes.settingsIcon}/>
					</IconButton>
					
					<Menu
						
						id="settings-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						getContentAnchorEl={null}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
						open={open}
						onClose={handleSettingsClose}
					>
						<MenuItem onClick={handleEdit}>
							Edit project
						</MenuItem>
						<MenuItem >
							<DeleteProject handleSettingsClose={handleSettingsClose}/>
						</MenuItem>
					</Menu>
				</div>

				<form className={classes.description} noValidate autoComplete="off" onSubmit={onSubmit}>
					<TextField
						className={classes.fontColor}
						id="project-description"
						multiline
						onKeyDown={handleEnterMultiline}
						disabled={!isEditing}
						fullWidth={true}
						InputProps={{
							disableUnderline: true,
							classes: {
								input: classes.descriptionStyle,
							},
						}}
						inputProps={{min: 0, style: { textAlign: 'center' }}}
						value={props.projectBannerState.description || ''}
						onChange={e => {props.dispatch({type: ActionTypes.UpdateDescription, payload: e.target.value})}}
					/>
				</form>

				{displayCreator()}

				<form className={classes.dateStart}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							className={classes.fontColor}
							format='dd MMMM yyyy'
							variant="inline"
							id="date-start"
							disabled={!isEditing}
							InputProps={{
								disableUnderline: true,
								classes: {
									input: classes.dateStyle,
								},
							}}
							inputProps={{min: 0, style: { textAlign: 'end' }}}
							value={props.projectBannerState.dateStart || ''}
							onChange={newDate => {props.dispatch({type: ActionTypes.UpdateDateStart, payload: newDate})}}
						/>
					</MuiPickersUtilsProvider>
				</form>

				<form className={classes.dateEnd}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							className={classes.fontColor}
							format='dd MMMM yyyy'
							variant="inline"
							id="date-end"
							disabled={!isEditing}
							InputProps={{
								disableUnderline: true,
								classes: {
									input: classes.dateStyle,
								},
							}}
							inputProps={{min: 0, style: { textAlign: 'end' }}}
							minDate={props.projectBannerState.dateStart}
							value={props.projectBannerState.dateEnd || ''}
							onChange={newDate => {props.dispatch({type: ActionTypes.UpdateDateEnd, payload: newDate})}}
						/>
					</MuiPickersUtilsProvider>
				</form>
			</div>
		</Box>
		</ClickAwayListener>
		</>
	);
}

export default ProjectData;