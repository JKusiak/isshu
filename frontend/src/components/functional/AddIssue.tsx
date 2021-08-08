import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios, { AxiosResponse } from 'axios';
import AddIcon from '@material-ui/icons/AddOutlined';
import { Card, Typography } from '@material-ui/core';
import { INestedColumn } from '../../types/ModelTypes';
import { getLoggedInUser } from './GetLoggedInUser';
import AddIssueButton from '../modals/AddIssueButton';


const useStyles = makeStyles((theme: Theme) => createStyles({

      buttonContainer: {
            display: 'grid',
            padding: '0.5em',
            gridTemplateColumns: '0.2fr 1fr',
            width: '100%',
            backgroundColor: 'white',
            "&:hover": {
                  cursor: 'pointer',
                  backgroundColor: theme.palette.action.hover,
            }
      },
      icon: {
            gridColumn: '1',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: '25px',
            color: theme.palette.secondary.light,
      },
      text: {
            gridColumn: '2',
            justifySelf: 'start',
            alignSelf: 'center',
            fontSize: 15,
            color: theme.palette.secondary.light,
      },
}));


interface AddIssueProps {
      column: INestedColumn,
      fetchBoard: () => void,
}


const AddIssue: FC<AddIssueProps> = (props) => {
      const classes = useStyles();
      const [issueDescription, setIssueDescription] = useState('');
      const [addMode, setAddMode] = useState(false);


      const issue = {
            description: issueDescription,
            creator: getLoggedInUser()._id,
      }
  

      function addIssueToColumn(res: AxiosResponse) {
            const issueToAdd = {
                  issueId: res.data._id,
            };

            const columnId = props.column._id;

            axios.post(`http://localhost:5000/columns/addIssue/${columnId}`, issueToAdd, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  console.log(res.data);
                  setAddMode(false);
                  props.fetchBoard();
            }).catch((err) => {
                  console.log(err);
            });
      }


      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            axios.post('http://localhost:5000/issues/add', issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  addIssueToColumn(res);
            })
      } 


      return (
            <AddIssueButton
                  onSubmit={onSubmit}
                  addMode={addMode}
                  setAddMode={setAddMode}
                  setIssueDescription={setIssueDescription}
            />
      );
}

export default AddIssue;