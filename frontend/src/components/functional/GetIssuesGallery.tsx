import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IssueTemplate } from "../../types/ModelContentTemplate";
import { IIssue } from "../../types/ModelTypes";
import IssuesList from "../IssuesList";

interface GetIssuesGalleryProps {

}

const GetIssuesGallery: FC<GetIssuesGalleryProps> = (props) => {
      const [issuesCreated, setIssuesCreated] = useState<[IIssue]>([IssueTemplate]);
      const [issuesTaken, setIssuesTaken] = useState<[IIssue]>([IssueTemplate]);

      // requests issues created by user
      useEffect(() => {
            axios.get('http://localhost:5000/issues/getIssueCreator/60bce0e59c89184d505fa989')
            .then(resp => {
                  const issuesData = resp.data;
                  setIssuesCreated(issuesData);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []); 
      
      // requests issues taken by user
      useEffect(() => {
            axios.get('http://localhost:5000/issues/getIssueContributor/60bce0e59c89184d505fa989')
            .then(resp => {
                  const issuesData = resp.data;
                  setIssuesTaken(issuesData);
            }).catch((err) => {
                  console.log(err);
            });;
      }, []); 


      return (
            <>
                  <IssuesList issuesTaken={issuesTaken} issuesCreated={issuesCreated}/>
            </>
            );
}

export default GetIssuesGallery;