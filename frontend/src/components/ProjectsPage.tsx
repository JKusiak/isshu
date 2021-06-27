import { FC } from "react"
import FetchProjects from "./functional/FetchProjects";

interface ProjectsPageProps {

}

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
      
      return (
      <>
            <FetchProjects/>
      </>
      );
}

export default ProjectsPage;