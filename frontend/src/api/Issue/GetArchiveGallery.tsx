import axios from "axios";
import { FC, useState } from "react";
import { useMountEffect } from "../../hooks/useMountEffect";
import ArchiveGallery from "../../pages/Home/Subpages/ArchiveGalleryPage";
import { NestedIssueTemplate } from "../../types/ModelContentTemplate";
import { INestedIssue, IUser } from "../../types/ModelTypes";


interface GetArchiveGalleryProps {
	user: IUser,
}


const GetArchiveGallery: FC<GetArchiveGalleryProps> = (props) => {
	const [archivedIssues, setArchivedIssues] = useState<[INestedIssue]>([NestedIssueTemplate]);


	useMountEffect(fetchArchive);


	function fetchArchive() {
		axios.get(`/organization/archive/${props.user.organizationId}`)
			.then((res) => {
				if (res.data.archivedIssues) {
					setArchivedIssues(res.data.archivedIssues);
				}
			}).catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			<ArchiveGallery archivedIssues={archivedIssues} />
		</>
	);
}

export default GetArchiveGallery;