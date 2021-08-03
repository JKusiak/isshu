import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import IssueData from "./IssueData";
import { ButtonGroup, IconButton } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            columnWrapper: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:not(:last-child)": {
                        borderRight: '0.1px solid',
                        borderRightColor: theme.palette.primary.dark,
                  },
            },
            columnHeader: {
                  display: 'grid',
                  gridTemplateColumns: '0.5fr 1fr 0.5fr',
                  width: '100%',
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
                  margin: 8,
                  background: theme.palette.primary.main,
                  width: 275,
                  minHeight: 500
            },
      }
));


interface ColumnDataProps {
      column: any,
      columnIndex: number,
}


const ColumnData: FC<ColumnDataProps> = (props) => {
      const classes = useStyles();
      const [isMouseOver, setIsMouseOver] = useState(false);

      function displayColumn() {
            return(
                  <div className={classes.columnWrapper}>
                        <ButtonGroup 
                              className={classes.columnHeader} 
                              onMouseOver={() => setIsMouseOver(true)} 
                              onMouseOut={() => setIsMouseOver(false)}
                        >
                              <h2 className={classes.columnName}>{props.column.name}</h2>
                              
                              
                              {isMouseOver && 
                              <IconButton 
                                    className={classes.deleteColumnButton}
                                    onMouseOver={() => setIsMouseOver(true)}
                                    
                              >
                                    <DeleteIcon/>
                              </IconButton>}
                              
                              
                        </ButtonGroup>
                        
                        <Droppable
                              key={props.columnIndex}
                              droppableId={props.column._id}
                        >
                              {(provided, snapshot) => {
                                    return (
                                          <div className={classes.columnContentWrapper}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                          >
                                                {props.column.issues.map((issue: any, index: any) => {
                                                      return (
                                                            <IssueData issue={issue} issueIndex={index}/>
                                                            
                                                      );
                                                })}
                                                {provided.placeholder}
                                          </div>
                                    );
                              }}
                        </Droppable>
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