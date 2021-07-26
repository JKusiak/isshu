import { FC } from "react";
import { useRouteMatch } from "react-router-dom";
import { Route, Switch} from 'react-router-dom';
import GetBoard from "./functional/GetBoard";
import GetBoardsGallery from "./functional/GetBoardsGallery";


interface ProjectDataProps {

}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const { path } = useRouteMatch();

      return (
            <>
            <Switch>
                  <Route path={`${path}/:id`}>
                        <GetBoard/>
                  </Route>
                  <Route exact path={path}>
                        <GetBoardsGallery/>
                  </Route>
            </Switch>
            </>
      );
}

export default ProjectData;