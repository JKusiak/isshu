import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IOrganization } from "../../types/ModelTypes";
import OrganizationImage from "../images/OrganizationImage";


interface ManageOrganizationImageProps {
	organization: IOrganization,
	user: any,
	errorText: string,
	setErrorText: React.Dispatch<React.SetStateAction<string>>,
}


const ManageOrganizationImage: FC<ManageOrganizationImageProps> = (props) => {
	const [file, setFile] = useState<string | Blob>('');
	const [imageExists, setImageExists] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>('');

	
	// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, []);


	// executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
		if (file != '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();

		formData.append('organizationId', props.organization._id);
		formData.append('directory', 'logo');
		formData.append('imageUpload', file);

		axios.post(`http://localhost:5000/uploads/add/${props.organization._id}`, formData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data'
			}
		}).then(() => {
			checkIfExists();
			props.setErrorText('');
		}).catch(() => {
			props.setErrorText('Please upload in .jpg format and under 1MB file size');
		})
	}


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${props.organization._id}%2flogo%2f${props.organization._id}.jpg`;

		axios.get(`http://localhost:5000/uploads/get/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).then((resp) => {
			setImageExists(resp.data);
			if(resp.data) {
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
			<OrganizationImage
				imageExists={imageExists}
				setFile={setFile}
				imageUrl={imageUrl}
			/>
		</>
	);
}

export default ManageOrganizationImage;