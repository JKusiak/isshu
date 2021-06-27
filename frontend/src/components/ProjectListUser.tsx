import { FC } from "react"

interface ProjectListProps {
      projects: any;
}

const ProjectListUser: FC<ProjectListProps> = (props) => {

      function displayProjects() {
            if(props.projects.length > 0) {
                  return(props.projects.map((project: any, index: any) => {
                        return(
                              <div className="project_container" key={index}>
                                    <h2>List of all your projects:</h2>
                                    <p className="project_name"> {project.name} </p>
                                    <p className="project_description"> {project.description} </p>
                              </div>
                        );
                  }));
            } else {
                  return(
                        <h3>No projects yet</h3>
                  );
            }
      }
     
      return(
            <>
                  {displayProjects()}
            </>
      );
}

export default ProjectListUser;
