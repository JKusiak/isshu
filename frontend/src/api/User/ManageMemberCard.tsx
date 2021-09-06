import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../App";
import GalleryMember from "../../components/User/GalleryMember";
import { INestedUser } from "../../types/ModelTypes";


interface ManageMemberCardProps {
	member: INestedUser,
}


const ManageMemberCard: FC<ManageMemberCardProps> = (props) => {
	const [imageExists, setImageExists] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string>('');
	const { loggedInUser } = useContext(AuthUserContext);

	// when props are loaded, fetches image from the server
	useEffect(() => {
		checkIfExists();
	}, [props.member]);


	function checkIfExists() {
		// substitutes backslash (/) with %2f as the whole path is passed as one parameter
		const path = `uploads%2forganization-${loggedInUser.organizationId}%2fuser-profile%2f${props.member._id}.jpg`;

		axios.get(`/uploads/get/${path}`)
			.then((resp) => {
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

export default ManageMemberCard;