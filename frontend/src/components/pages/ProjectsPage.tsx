import { FC } from "react"
import GetProjectsBoard from "../functional/GetProjectsBoard";

interface ProjectsPageProps {

}

const ProjectsPage: FC<ProjectsPageProps> = (props) => {
      
      return (
      <>
            <GetProjectsBoard/>
      </>
      );
}

export default ProjectsPage;