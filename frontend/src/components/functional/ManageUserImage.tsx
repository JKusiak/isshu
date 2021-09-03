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
	const [imageExists, setImageExists] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>('');


	/// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, [props.user]);


	// executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
		if (file !== '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();
		console.log('done');
		formData.append('organizationId', props.user.organizationId);
		formData.append('directory', 'user-profile');
		formData.append('imageUpload', file);

		axios.post(`http://localhost:5000/uploads/add/${props.user._id}`, formData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data'
			}
		}).then((resp) => {
			checkIfExists();
			props.setErrorText('');
		}).catch((err) => {
			props.setErrorText('Please upload in .jpg format and under 1MB file size');
		})
	}


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${props.user.organizationId}%2fuser-profile%2f${props.user._id}.jpg`;

		axios.get(`http://localhost:5000/uploads/get/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).then((resp) => {
			setImageExists(resp.data);
			if (resp.data) {
				// ?t= and timestamp added to trick cache into re-downloading image under same path
				const adjustedPath = path.replaceAll('%2f', '/') + '?t=' + new Date().getTime();
				setImageUrl(`http://localhost:5000/${adjustedPath}`);
			}
		}).catch((err) => {
			console.log(err);
		})
	}


	return (
		<>
			<UserImage
				imageExists={imageExists}
				setFile={setFile}
				imageUrl={imageUrl}
			/>
		</>
	);
}

export default ManageUserImage;