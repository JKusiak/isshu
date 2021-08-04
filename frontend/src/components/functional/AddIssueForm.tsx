import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme: Theme) => createStyles({
      form: {
            width: '100%',
      },
      buttonIcon: {
            fontSize: '30px',
            color: theme.palette.secondary.main,
      },
}));


interface AddIssueFormProps {
      column: any,
      fetchBoard: any,
      setAddMode: any,
}


const AddIssueForm: FC<AddIssueFormProps> = (props) => {
      const classes = useStyles();
      const [issueDescription, setIssueDescription] = useState('');


      function getCreator() {
            const token = localStorage.getItem('token') || '';
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
      }


      const issue = {
            description: issueDescription,
            creator: getCreator()._id,
      }

      
      function onSubmit(e: any) {
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
    <> 
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
            <TextField
                  required
                  autoFocus
                  variant='outlined'
                  name="issueDescription"
                  id="issueDescription"
                  placeholder="Enter description for the issue"
                  autoComplete="issue-description"
                  onChange={e => {
                        setIssueDescription(e.target.value);
                  }}
            />
            <IconButton type="submit">
                  <AddIcon className={classes.buttonIcon}/> 
            </IconButton> 
      </form>
    </>
  );
}

export default AddIssueForm;