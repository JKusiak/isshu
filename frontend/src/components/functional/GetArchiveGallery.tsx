import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IUser } from "../../types/ModelTypes";
import ArchiveGallery from "../galleries/ArchiveGallery";


interface GetArchiveGalleryProps {
	user: IUser,
}


const GetArchiveGallery: FC<GetArchiveGalleryProps> = (props) => {
	const [archivedIssues, setArchivedIssues] = useState<[]>([]);

	useEffect(() => {
		fetchArchive();
	}, []);


	function fetchArchive() {
		axios.get(`http://localhost:5000/organization/archive/${props.user.organizationId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}).then((res) => {
			if(res.data.archivedIssues){
				setArchivedIssues(res.data.archivedIssues);
			}
		}).catch((err) => {
			console.log(err);
		});
	}


	return (
		<>
			<ArchiveGallery archivedIssues={archivedIssues}/>
		</>
	);
}

export default GetArchiveGallery;