import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserIssuesGallery from "../../components/User/UserIssuesGallery";
import { IssueTemplate, NestedIssueTemplate } from "../../types/ModelContentTemplate";
import { IIssue, INestedIssue } from "../../types/ModelTypes";


const GetUserIssues = () => {
	const { userId } = useParams<{ userId: string }>();
	const [issuesCreated, setCreated] = useState<[INestedIssue]>([NestedIssueTemplate]);
	const [issuesTaken, setTaken] = useState<[INestedIssue]>([NestedIssueTemplate]);

	// issues created by user
	useEffect(() => {
		axios.get(`/issues/getIssuesCreator/${userId}`)
			.then(resp => {
				setCreated(resp.data);
			}).catch((err) => {
				console.log(err);
			});
	}, [userId]);

	// issues taken by user
	useEffect(() => {
		axios.get(`/issues/getIssuesContributor/${userId}`)
			.then(resp => {
				setTaken(resp.data);
			}).catch((err) => {
				console.log(err);
			});
	}, [userId]);


	return (
		<>
			<UserIssuesGallery issuesTaken={issuesTaken} issuesCreated={issuesCreated} />
		</>
	);
}

export default GetUserIssues;