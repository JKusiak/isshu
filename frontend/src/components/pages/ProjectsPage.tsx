import { FC } from "react"
import GetProjects from "../functional/GetProjects";

interface ProjectsPageProps {

}

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
      
      return (
      <>
            <GetProjects/>
      </>
      );
}

export default ProjectsPage;