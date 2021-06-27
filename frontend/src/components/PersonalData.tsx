import { FC } from "react";

interface PersonalDataProps {
      credentials: any;
      issuesTaken: any;
      issuesCreated: any;
}

const PersonalData: FC<PersonalDataProps> = (props) => {
      function displayIssues(type: 'issuesTaken' | 'issuesCreated') {
            if(props[type].length > 0 ) {
                  return(props[type].map((issue: any, index: any) => {
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
                  <h3>Name: {props.credentials.name}</h3>
                  <h3>Surname: {props.credentials.surname}</h3>
                  <h3>Email: {props.credentials.email}</h3>

                  <h3>Issues you created: </h3>
                  {displayIssues('issuesCreated')}
                  <h3>Issues you took:</h3>
                  {displayIssues('issuesTaken')}
                  
            </>
      );
}

export default PersonalData;