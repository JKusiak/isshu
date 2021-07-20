import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { useRouteMatch } from "react-router-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GetBoard from "./functional/GetBoard";
import GetBoardsGallery from "./functional/GetBoardsGallery";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({

      }
));


interface ProjectDataProps {
      project: any,
      projectId: any,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();
      const { path } = useRouteMatch();

      return (
            <>
            <Switch>
                  <Route path={`${path}/:id`}>
                        <GetBoard/>
                  </Route>
                  <Route exact path={path}>
                        <GetBoardsGallery projectId={props.projectId}/>
                  </Route>
            </Switch>
            </>
      );
}

export default ProjectData;