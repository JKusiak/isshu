import { Route, Switch, useRouteMatch } from "react-router-dom";
import GetBoard from "./functional/GetBoard";
import GetBoardsGallery from "./functional/GetBoardsGallery";


const ProjectData = () => {
	const { path } = useRouteMatch();

	return (
		<>
			<Switch>
				<Route path={`${path}/:boardId`}>
					<GetBoard />
				</Route>
				<Route path={path}>
					<GetBoardsGallery />
				</Route>
			</Switch>
		</>
	);
}

export default ProjectData;