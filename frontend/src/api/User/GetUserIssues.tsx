import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserIssuesGallery from "../../components/User/UserIssuesGallery";
import { NestedIssueTemplate } from "../../types/ModelContentTemplate";
import { INestedIssue } from "../../types/ModelTypes";


const GetUserIssues = () => {
	const { userId } = useParams<{ userId: string }>();
	const [issuesCreated, setCreated] = useState<[INestedIssue]>([NestedIssueTemplate]);
	const [issuesTaken, setTaken] = useState<[INestedIssue]>([NestedIssueTemplate]);
	const [isLoadedCreated, setLoadedCreated] = useState<boolean>(false);
	const [isLoadedTaken, setLoadedTaken] = useState<boolean>(false);

	// issues created by user
	useEffect(() => {
		axios.get(`/issues/getIssuesCreator/${userId}`)
			.then(resp => {
				setCreated(resp.data);
				setLoadedCreated(true);
			}).catch((err) => {
				console.log(err);
			});
	}, [userId]);

	// issues taken by user
	useEffect(() => {
		axios.get(`/issues/getIssuesContributor/${userId}`)
			.then(resp => {
				setTaken(resp.data);
				setLoadedTaken(true);
			}).catch((err) => {
				console.log(err);
			});
	}, [userId]);


	return (
		<>
		{isLoadedCreated && isLoadedTaken && 
			<UserIssuesGallery issuesTaken={issuesTaken} issuesCreated={issuesCreated} />
		}
		</>
	);
}

export default GetUserIssues;