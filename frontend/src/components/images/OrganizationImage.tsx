import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ImagePlaceholder from '@material-ui/icons/ImageOutlined';
import React, { FC, useRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		image: {
			display: 'flex',
			width: '150px',
			height: '150px',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: theme.spacing(4),
			boxShadow: theme.shadows[2],
			"&:hover": {
				cursor: 'pointer',
				boxShadow: theme.shadows[5],
				opacity: 0.7,
			},
		},
	})
);


interface OrganizationImageProps {
	url: string | undefined,
	setFile: React.Dispatch<React.SetStateAction<string | Blob>>,
}


const OrganizationImage: FC<OrganizationImageProps> = (props) => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const classes = useStyles();

	// ref that allows to treat an image like an upload button
	function handleImageClick() {
		imageInputRef.current?.click();
	}


	function handleChooseFile(e: any) {
		props.setFile(e.target.files[0]);
	}

	return (
		<>
			<input
				style={{ display: 'none' }}
				type="file"
				onChange={handleChooseFile}
				ref={imageInputRef}
			/>

			{props.url ?
				<img className={classes.image} src={props.url} onClick={handleImageClick} /> :
				<ImagePlaceholder className={classes.image} onClick={handleImageClick} />
			}
		</>

	);
}

export default OrganizationImage;