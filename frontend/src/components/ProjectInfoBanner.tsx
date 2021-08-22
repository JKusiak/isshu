import DateFnsUtils from '@date-io/date-fns';
import { Box, ClickAwayListener, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { FC, useEffect, useState } from "react";
import Banner from '../resources/banners/banner.jpg';
import { UserTemplate } from "../types/ModelContentTemplate";
import { IProject, IUser } from "../types/ModelTypes";
import DeleteProject from "./functional/DeleteProject";


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
			color: 'white',
		},
		"& .MuiInputBase-root": {
			color: 'rgba(255, 255, 255, 0.6)',
		},
		"& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
			color: 'white',
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
	project: IProject, 
	changeData: (newProjectData: any) => void,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [projectName, setProjectName] = useState<string>('');
	const [projectDescription, setProjectDescription] = useState<string>('');
	const [creator, setCreator] = useState<IUser>(UserTemplate);
	const [dateStart, setDateStart] = useState<Date | null>(new Date());
	const [dateEnd, setDateEnd] = useState<Date | null>(new Date());
	const [isEditing, setIsEditing] = useState(false);


	useEffect(() => {
		setProjectName(props.project.name);
		setProjectDescription(props.project.description);
		setCreator(props.project.creator);
		setDateStart(props.project.dateStart);
		setDateEnd(props.project.dateEnd);
	}, [props.project.name, 
		props.project.description,
		props.project.creator,
		props.project.dateStart,
		props.project.dateEnd]
	);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		let updatedProject = {
			name: projectName,
			description: projectDescription,
			creator: creator._id,
			dateStart: dateStart,
			dateEnd: dateEnd,
		}

		setIsEditing(false);
		props.changeData(updatedProject);
	}


	function displayCreator() {
		if(creator !== undefined && creator !== null) {
			return(
				<form className={classes.creator}>
					<TextField
						className={classes.fontColor}
						id="project-creator" 
						disabled={true}
						InputProps={{
							disableUnderline: true,
							classes: {
								input: classes.creatorStyle,
							},
						}}
						inputProps={{min: 0, style: { textAlign: 'end' }}}
						value={`Creator: ${creator.name} ${creator.surname}`  || ''}
					/>
				</form>
			)
		}
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
		if(e.which === 13) {
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
						value={projectName || ''}
						onChange={e => {setProjectName(e.target.value)}}
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
						value={projectDescription || ''}
						onChange={e => {setProjectDescription(e.target.value)}}
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
							value={dateStart}
							onChange={newDate => setDateStart(newDate)}
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
							minDate={dateStart}
							value={dateEnd}
							onChange={newDate => setDateEnd(newDate)}
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