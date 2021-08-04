import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, Fragment, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import IssueData from "./IssueData";
import { IconButton } from "@material-ui/core";
import DeleteColumnForm from "./functional/DeleteColumnForm";
import AddIssueModal from "./modals/AddIssueModal";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            columnWrapper: {
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 500,
                  alignItems: "center",
                  "&:not(:last-child)": {
                        borderRight: '0.1px solid',
                        borderRightColor: theme.palette.primary.dark,
                  },
            },
            columnHeader: {
                  display: 'grid',
                  gridTemplateColumns: '0.5fr 1fr 0.5fr',
                  minWidth: '100%',
                  paddingBottom: '0.5em',
                  borderBottom: '0.1px solid',
                  borderBottomColor: theme.palette.primary.dark,
            },
            columnName: {
                  gridColumn: '2',
                  justifySelf: 'center',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: theme.palette.secondary.light,    
            },
            deleteColumnButton: {
                  gridColumn: '3',
                  justifySelf: 'end',
            },
            columnContentWrapper: {
                  width: 275,
                  height: 'auto',
                  margin: 8,
                  backgroundColor: 'red',
            },
      }
));


interface ColumnDataProps {
      column: any,
      fetchBoard: any,
}


const ColumnData: FC<ColumnDataProps> = (props) => {
      const classes = useStyles();
      const [isMouseOver, setIsMouseOver] = useState(false);


      function displayColumn() {
            return(
                  <div className={classes.columnWrapper}>
                        <div 
                              className={classes.columnHeader} 
                              onMouseOver={() => setIsMouseOver(true)} 
                              onMouseOut={() => setIsMouseOver(false)}        
                        >
                              <h2 className={classes.columnName}>{props.column.name}</h2>
                              
                              {true &&
                              <div className={classes.deleteColumnButton}>
                                          <DeleteColumnForm column={props.column} fetchBoard={props.fetchBoard}/>
                              </div>
                              }
                        </div>
                              
                        <Droppable droppableId={props.column._id}>
                              {provided => {
                                    return (
                                          <div className={classes.columnContentWrapper}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                          >
                                                {props.column.issues.map((issue: any, index: any) => {
                                                      return (
                                                            <Fragment key={index}>
                                                                  <IssueData issue={issue}/>
                                                            </Fragment>
                                                      );
                                                })}
                                                {provided.placeholder}
                                          </div>
                                    );
                              }}
                        </Droppable>

                        <AddIssueModal column={props.column} fetchBoard={props.fetchBoard}/>
                  </div>          
            )                           
      }




      return (
            <>
                  {displayColumn()}
            </>
      );
}

export default ColumnData;