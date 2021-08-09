import { FC } from "react";
import { IIssue, INestedIssue } from "../types/ModelTypes";


interface IssuesListProps {
      issuesTaken: [INestedIssue];
      issuesCreated: [INestedIssue];
}

const IssuesList: FC<IssuesListProps> = (props) => {
      function displayIssues(type: 'issuesTaken' | 'issuesCreated') {
            if(props[type].length > 0 ) {
                  return(props[type].map((issue: INestedIssue, index: number) => {
                        return(
                              <div className="issue_container" key={index}>
                                    <p className="issue_description"> {issue.name} </p>
                              </div>
                        );
                  }));
            } else {
                  return(
                        <h3>No taken issues yet</h3>
                  );
            }
      }


      return(
            <>
                  <h3>Issues you created: </h3>
                  {displayIssues('issuesCreated')}
                  <h3>Issues you took:</h3>
                  {displayIssues('issuesTaken')}
                  
            </>
      );
}

export default IssuesList;