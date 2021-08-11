import axios from "axios";
import { FC, useState, useEffect, createContext } from "react";
import { IssueTemplate } from "../../types/ModelContentTemplate";
import {  IColumn, IIssue } from "../../types/ModelTypes";
import ColumnData from "../ColumnData";


interface GetColumnProps {
      column: IColumn,
}

// context for avoiding propagating function fetchBoard() for refreshing 
// the board content to child components
export const FetchBoardContext = createContext<() => void>(() => null);


const GetColumn: FC<GetColumnProps> = (props) => {
      const columnId = props.column._id;
      const [isLoaded, setIsLoaded] = useState<boolean>(false);
      const [issues, setIssues] = useState<[IIssue]>([IssueTemplate]);
      

      useEffect(() => {
            fetchIssues();
      }, []);


      function fetchIssues() {
            console.log(columnId);
            axios.get(`http://localhost:5000/columns/getIssues/${columnId}`, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then(resp => {
                  setIssues(resp.data);
                  // is loaded necessary for dnd components to receive columnIDs on first render
                  setIsLoaded(true);
            }).catch((err) => {
                  console.log(err);
            });
      }




      return (
            <>
            {isLoaded &&
                  <ColumnData column={props.column} issues={issues}/>
            }
            </>
      );
}

export default GetColumn;