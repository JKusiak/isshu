import axios from "axios";
import { FC, useEffect, useState } from "react";
import PersonalData from "../PersonalData";
import ProjectListUser from "../ProjectListUser";

interface GetUserDataProps {

}

const GetUserData: FC<GetUserDataProps> = (props) => {
      const [credentials, setCredentials] = useState({});
      const [projects, setProjects] = useState('');
      const [issuesCreated, setIssuesCreated] = useState('');
      const [issuesTaken, setIssuesTaken] = useState('');

      // requests array of objects of all projects belonging to user
      useEffect(() => {
            axios.get('http://localhost:5000/users/getProjects/60dca3332045f733ac918b2b', {
                  headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjYTMzMzIwNDVmNzMzYWM5MThiMmIiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWF0IjoxNjI1MDcyNzU0fQ.rU1shosVRHUTC8LOgV43NJOabkCnWHErCwGYErMRH9U'
                  }
            }).then(resp => {
                  const userProjects = resp.data.projects;
                  setProjects(userProjects);
            });
        }, []);

      // requests user object by their id
      useEffect(() => {
            axios.get('http://localhost:5000/users/60bce0e59c89184d505fa989')
            .then(resp => {
                  const userCredentials = resp.data;
                  setCredentials(userCredentials);
            });
        }, []);

      // requests issues created by user
      useEffect(() => {
            axios.get('http://localhost:5000/issues/getIssueCreator/60bce0e59c89184d505fa989')
            .then(resp => {
                  const issuesData = resp.data;
                  setIssuesCreated(issuesData);
            });
        }, []); 
        
      // requests issues taken by user
      useEffect(() => {
            axios.get('http://localhost:5000/issues/getIssueContributor/60bce0e59c89184d505fa989')
            .then(resp => {
                  const issuesData = resp.data;
                  setIssuesTaken(issuesData);
            });
        }, []); 
        
        
        

      return (
      <>
            <PersonalData credentials={credentials} issuesTaken={issuesTaken} issuesCreated={issuesCreated} />
            <ProjectListUser projects={projects}/>
      </>
      );
}

export default GetUserData;