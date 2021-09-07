import { Box, ClickAwayListener, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import { Action, ActionTypes } from '../../../reducers/ProjectReducer';
import { IProject } from "../../../types/ModelTypes";
import DateForm from './DateForm';
import DescriptionForm from "./DescriptionForm";
import NameForm from "./NameForm";
import SettingsList from './SettingsList';


const useStyles = makeStyles<Theme, ProjectDataProps>(theme => createStyles({
	projectInfoBanner: {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		height: '30vh',
		[theme.breakpoints.down('xs')]: {
			height: '40vh',
		},
		'&::before': {
			content: '""',    // why for the love of god...
			display: 'block',
			position: 'absolute',
			width: '100%',
			height: '100%',
			zIndex: -1,
			background: ({ bannerPath, imageExists }) => imageExists ? `url(${bannerPath})` : theme.palette.secondary.light,
			backgroundSize: 'cover',
			filter: 'blur(3px) brightness(75%)',
		},
	},
	gridWrapper: {
		display: 'grid',
		width: '100%',
		height: '100%',
		padding: theme.spacing(2),
		gridTemplateColumns: '1fr 0.5fr 2fr 0.5fr 1fr',
		gridTemplateRows: '0.5fr 1fr 1.5fr 0.5fr 0.5fr 0.5fr',
		gridTemplateAreas: `
			". . . . settings"
			". . projectName . ."
			". description description description ."
			". description description description creator"
			". description description description dateStart"
			". . . . dateEnd"`
	},
	creator: {
		gridArea: 'creator',
		justifySelf: 'end',
		alignSelf: 'center',
		color: '#fafafa',
		fontWeight: 600,
		[theme.breakpoints.down('xs')]: {
			fontSize: '12px',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '16px',
		},
	},
	dateStart: {
		gridArea: 'dateStart',
	},
	dateEnd: {
		gridArea: 'dateEnd',
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
}
));


interface ProjectDataProps {
	projectBannerState: IProject,
	dispatch: React.Dispatch<Action>,
	updateProject: () => void,
	bannerPath: string | undefined,
	setFile: React.Dispatch<React.SetStateAction<string | Blob>>,
	imageExists: boolean,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
	const classes = useStyles(props);
	const [isEditing, setIsEditing] = useState(false);


	function onSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		setIsEditing(false);
		props.updateProject();
	}


	function displayCreator() {
		const creator = props.projectBannerState.creator;
		return (
			<Typography className={`${classes.creator} ${classes.fontColor}`}>
				Creator: {creator.name} {creator.surname}
			</Typography>
		)
	}


	function handleClickAway(e: React.MouseEvent<Document, MouseEvent>) {
		if (isEditing === true) {
			setIsEditing(false);
			// type casting like this necessary because of insufficient overlap of types
			onSubmit(e as unknown as React.SyntheticEvent);
		}
	}


	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box className={classes.projectInfoBanner}>
				<div className={classes.gridWrapper}>
					<NameForm
						isEditing={isEditing}
						value={props.projectBannerState.name}
						dispatch={props.dispatch}
						actionType={ActionTypes.UpdateName}
						onSubmit={onSubmit}
					/>

					<SettingsList
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						setFile={props.setFile}
					/>

					<DescriptionForm
						isEditing={isEditing}
						value={props.projectBannerState.description}
						dispatch={props.dispatch}
						actionType={ActionTypes.UpdateDescription}
						onSubmit={onSubmit}
					/>

					{displayCreator()}

					<div className={classes.dateStart}>
						<DateForm
							isEditing={isEditing}
							value={props.projectBannerState.dateStart}
							minDate={new Date('January 1, 1900')}
							dispatch={props.dispatch}
							actionType={ActionTypes.UpdateDateStart}
						/>

					</div>

					<div className={classes.dateEnd}>
						<DateForm
							isEditing={isEditing}
							value={props.projectBannerState.dateEnd}
							minDate={props.projectBannerState.dateStart}
							dispatch={props.dispatch}
							actionType={ActionTypes.UpdateDateEnd}
						/>
					</div>
				</div>
			</Box>
		</ClickAwayListener>
	);
}

export default ProjectData;