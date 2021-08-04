import { FC } from "react";

interface IssuesListProps {
      issuesTaken: any;
      issuesCreated: any;
}

const IssuesList: FC<IssuesListProps> = (props) => {
      function displayIssues(type: 'issuesTaken' | 'issuesCreated') {
            if(props[type].length > 0 ) {
                  return(props[type].map((issue: any, index: number) => {
                        return(
                              <div className="issue_container" key={index}>
                                    <p className="issue_description"> {issue.description} </p>
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