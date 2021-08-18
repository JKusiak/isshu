import { Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { INestedIssue } from "../types/ModelTypes";
import IssueContentModal from "./modals/IssueContentModal";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            issueCard: {
                  height: 'auto',
                  minHeight: '70px',
                  maxHeight: '250px',
                  marginBottom: theme.spacing(2),
                  boxShadow: theme.shadows[2],
                  "&:hover": {
                        cursor: 'pointer',
                        boxShadow: theme.shadows[5],
                  }
            },
            name: {
                  padding: theme.spacing(1),
                  fontSize: '14px',
                  color: theme.palette.secondary.main,
            }
      }
));


interface IssueDataProps {
      issue: INestedIssue,
      index: number,
}


const IssueData: FC<IssueDataProps> = (props) => {
	const classes = useStyles();
	const [isModalOpen, setIsModalOpen] = useState(false);


	return(
		<>
		<Draggable draggableId={props.issue._id} index={props.index}>
			{(provided) => {
				return(
					<>
						<Card
							className={classes.issueCard}
							onClick={() => setIsModalOpen(true)}
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							style={{
									...provided.draggableProps.style
							}}
						>
							<Typography className={classes.name} component='h6' variant='h6'>
									{props.issue.name}
							</Typography>
						</Card>

						<IssueContentModal 
							issue={props.issue} 
							isIssueModalOpen={isModalOpen} 
							setIssueModalOpen={setIsModalOpen}
						/>
					</>
				);
			}}
		</Draggable>
		</>
	);
}

export default IssueData;