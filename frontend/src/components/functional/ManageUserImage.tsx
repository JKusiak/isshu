import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IUser } from "../../types/ModelTypes";
import UserImage from "../images/UserImage";


interface ManageUserImageProps {
	user: IUser,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
}


const ManageUserImage: FC<ManageUserImageProps> = (props) => {
	const [file, setFile] = useState<string | Blob>('');
	const [url, setUrl] = useState<string | undefined>();


	// when props are loaded, fetches image from the server
	useEffect(() => {
		if (props.user._id) {
			fetchImage(`uploads/organization-${props.user.organizationId}/user-profile/${props.user._id}.jpg`);
		}
	}, [props.user._id]);


	// executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
		if (file != '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();

		formData.append('organizationId', props.user.organizationId);
		formData.append('directory', 'user-profile');
		formData.append('imageUpload', file);

		axios.post(`http://localhost:5000/uploads/add/${props.user._id}`, formData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data'
			}
		}).then((resp) => {
			const adjustedPath = resp.data.replaceAll('\\', '/');
			fetchImage(adjustedPath);
			props.setErrorText('');
		}).catch((err) => {
			props.setErrorText('Please upload in .jpg format and under 1MB file size');
		})
	}


	function fetchImage(path: string) {
		axios.get(`http://localhost:5000/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).then(() => {
			setUrl('');
			setUrl(`http://localhost:5000/${path}`);
		}).catch((err) => {
			setUrl(undefined);
		})
	}

	return (
		<>
			<UserImage
				url={url}
				setFile={setFile}
			/>
		</>
	);
}

export default ManageUserImage;