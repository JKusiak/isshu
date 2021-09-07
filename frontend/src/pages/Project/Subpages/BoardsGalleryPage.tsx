import { Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IssueIcon from '@material-ui/icons/BeenhereOutlined';
import { FC, Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AddBoard from "../../../api/Board/AddBoard";
import GetProjectInfoBanner from "../../../api/Project/GetProjectInfoBanner";
import { INestedProject } from "../../../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) => createStyles({
	gridContainer: {
		display: 'grid',
		width: '75%',
		justifyContent: 'center',
		gap: theme.spacing(4),
		gridTemplateColumns: 'repeat(auto-fill, minMax(450px, 1fr))',
		[theme.breakpoints.down('xs')]: {
			gridTemplateColumns: 'repeat(auto-fill)',
		},
		margin: theme.spacing(4),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.secondary.main,
	},
	boardCard: {
		display: 'grid',
		gridTemplateRows: '1fr 2fr 1fr',
		height: '300px',
		backgroundColor: theme.palette.primary.light,
		transition: 'all .12s linear',
		boxShadow: theme.shadows[2],
		"&:hover": {
			cursor: 'pointer',
			boxShadow: theme.shadows[5],
		}
	},
	boardName: {
		gridRow: 2,
		justifySelf: 'center',
		alignSelf: 'center',
		color: theme.palette.secondary.main,
	},
	progressCount: {
		gridRow: 3,
		height: '20px',
		width: 'auto',
		justifySelf: 'center',
		alignSelf: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '16px',
		color: theme.palette.secondary.light,
	},
	issueIcon: {
		marginLeft: theme.spacing(1),
		color: theme.palette.secondary.light,
		opacity: 0.7
	},
})
);


interface BoardsGalleryProps {
	project: INestedProject;
	fetchBoards: () => void;
}


const BoardsGalleryPage: FC<BoardsGalleryProps> = (props) => {
	const classes = useStyles();
	const { url } = useRouteMatch();


	function displayBoards() {
		if (props.project.boards) {
			return (props.project.boards.map((board: any) => {

				return (
					<Fragment key={board._id}>
						<Link className={classes.link} to={`${url}/${board._id}`}>
							<Card className={classes.boardCard}>
								<Typography className={classes.boardName} component="h5" variant="h5">
									{board.name}
								</Typography>
								<Typography className={classes.progressCount} component="h5" variant="h5">
									{`${board.totalCompleted} / ${board.totalIssues}`} <IssueIcon className={classes.issueIcon} />
								</Typography>
							</Card>
						</Link>
					</Fragment>
				);
			}));
		}
	}

	return (
		<>
			<GetProjectInfoBanner project={props.project} />

			<div className={classes.gridContainer}>
				<AddBoard fetchBoards={props.fetchBoards} />
				{displayBoards()}
			</div>
		</>
	);
}

export default BoardsGalleryPage;
