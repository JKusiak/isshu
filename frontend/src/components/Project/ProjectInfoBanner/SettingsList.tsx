import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import React, { FC, useRef, useState } from "react";
import DeleteProject from '../../../api/Project/DeleteProject';


const useStyles = makeStyles((theme: Theme) => createStyles({
	settings: {
		gridArea: 'settings',
		justifySelf: 'end',
		alignSelf: 'start',
		maxHeight: '100%',
		"& .MuiIconButton-root": {
			padding: 0,
		},
		"&:hover": {
			cursor: 'pointer',
		}
	},
	settingsIcon: {
		fontSize: '24px',
		color: '#fafafa',
	},
	menuPaper: {
		"& .MuiMenu-paper": {
			backgroundColor: theme.palette.primary.light,
		},
	},
	menuItem: {
		color: theme.palette.secondary.main,
	},
}));


interface SettingsProps {
	isEditing: boolean,
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
	setFile: React.Dispatch<React.SetStateAction<string | Blob>>,
}


const SettingsList: FC<SettingsProps> = (props) => {
	const classes = useStyles(props);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const openList = Boolean(anchorEl);

	function handleSettingsOpen(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget);
	};


	function handleSettingsClose() {
		setAnchorEl(null);
	};


	function handleEdit() {
		props.setIsEditing(!props.isEditing);
		handleSettingsClose();
	}

	function handleChangePicture() {
		imageInputRef.current?.click();
	}


	function handleChooseFile(e: any) {
		props.setFile(e.target.files[0]);
	}


	return (
		<div className={classes.settings}>
			<IconButton onClick={handleSettingsOpen}>
				<SettingsIcon className={classes.settingsIcon} />
			</IconButton>

			<Menu
				className={classes.menuPaper}
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
				open={openList}
				onClose={handleSettingsClose}
			>
				<MenuItem className={classes.menuItem} onClick={handleEdit}>
					Edit information
				</MenuItem>
				<MenuItem className={classes.menuItem} onClick={handleChangePicture}>
					Change background
				</MenuItem>
				<MenuItem className={classes.menuItem} onClick={() => { setModalOpen(true) }}>
					Delete project
					<DeleteProject
						open={modalOpen}
						setOpen={setModalOpen}
					/>
				</MenuItem>
				<input
					style={{ display: 'none' }}
					type="file"
					onChange={handleChooseFile}
					ref={imageInputRef}
				/>
			</Menu>
		</div>
	);
}

export default SettingsList;