import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Card, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
      formWrapper: {
            width: '100%',
      },
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
            fontSize: '30px',
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


interface AddIssueFormProps {
      column: any,
      fetchBoard: () => void,
      setAddMode: React.Dispatch<React.SetStateAction<boolean>>,
}


const AddIssueForm: FC<AddIssueFormProps> = (props) => {
      const classes = useStyles();
      const [issueDescription, setIssueDescription] = useState('');

      const issue = {
            description: issueDescription,
            creator: getCreator()._id,
      }


      function getCreator() {
            const token = localStorage.getItem('token') || '';
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
      }

      
      function onSubmit(e: React.SyntheticEvent) {
            e.preventDefault();
            
            axios.post('http://localhost:5000/issues/add', issue, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                  const issueToAdd = {
                        issueId: res.data._id,
                  };

                  axios.post(`http://localhost:5000/columns/addIssue/${props.column._id}`, issueToAdd, {
                        headers: {
                              'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                  }).then((res) => {
                        console.log(res.data);
                        props.setAddMode(false);
                        props.fetchBoard();
                  }).catch((err) => {
                        console.log(err);
                  });
            })
      } 


  return (
      <Card className={classes.formWrapper}> 
            <form onSubmit={onSubmit} autoComplete="off">
                  <TextField
                        required
                        autoFocus
                        fullWidth
                        variant='outlined'
                        name="issueDescription"
                        id="issueDescription"
                        placeholder="Enter description for the issue"
                        autoComplete="issue-description"
                        onChange={e => {
                              setIssueDescription(e.target.value);
                        }}
                  />
                  <div className={classes.buttonContainer} onClick={onSubmit}>
                        <AddIcon className={classes.icon}/>
                        <Typography className={classes.text} component='h6' variant='h6'>
                              Create issue
                        </Typography>
                  </div>
            </form>
      </Card>
  );
}

export default AddIssueForm;