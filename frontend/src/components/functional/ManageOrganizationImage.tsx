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
	const [url, setUrl] = useState<string | undefined>();


	// when props are loaded, fetches image from the server
	useEffect(() => {
		if (props.organization._id && props.user._id) {
			fetchImage(`uploads/organization-${props.organization._id}/logo/${props.user._id}.jpg`);
		}
	}, [props.organization._id, props.user._id]);


	// executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
		if (file != '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();

		formData.append('organizationId', props.organization._id);
		formData.append('directory', 'logo');
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
			<OrganizationImage
				url={url}
				setFile={setFile}
			/>
		</>
	);
}

export default ManageOrganizationImage;