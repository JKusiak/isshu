import { FC } from "react"

interface NavbarProps {
      projects: any;
}

const ProjectList: FC<NavbarProps> = (props) => {

      function displayProjects() {
            console.log(props.projects);
            if(props.projects.length > 0) {
                  return(props.projects.map((project: any, index: any) => {
                        return(
                              <>
                              <div className="project_container" key={index}>
                                    <p className="project_name"> {project.name} </p>
                                    <p className="project_description"> {project.description} </p>
                              </div>
                              </>
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

export default ProjectList;
