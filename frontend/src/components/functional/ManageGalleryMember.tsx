import axios from "axios";
import { FC, useEffect, useState } from "react";
import { INestedUser } from "../../types/ModelTypes";
import GalleryMember from "../GalleryMember";
import { getLoggedInUser } from "./GetLoggedInUser";


interface ManageGalleryImageProps {
	member: INestedUser,
}


const ManageGalleryImage: FC<ManageGalleryImageProps> = (props) => {
	const [imageExists, setImageExists] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const loggedInUser = getLoggedInUser();

	// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, [props.member]);


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${loggedInUser.organizationId}%2fuser-profile%2f${props.member._id}.jpg`;
		axios.get(`http://localhost:5000/uploads/get/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).then((resp) => {
			setImageExists(resp.data);
			if (resp.data) {
				const adjustedPath = path.replaceAll('%2f', '/');
				setImageUrl(`http://localhost:5000/${adjustedPath}`);
			}
		}).catch((err) => {
			console.log(err);
		})
	}


	return (
		<>
			<GalleryMember
				member={props.member}
				imageExists={imageExists}
				imageUrl={imageUrl}
			/>
		</>
	);
}

export default ManageGalleryImage;