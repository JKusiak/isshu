import React, { FC, useEffect, useState } from 'react';
import Button from '../ButtonSpacing';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) => createStyles({
      header: {
            display: 'grid',
            justifyContent: 'center',
      },
      form: {
            width: '100%',
            marginTop: theme.spacing(5),
      },
      submit: {
            margin: theme.spacing(3, 0, 3),
            borderRadius: '10px',
            fontWeight: 600,
            "&:hover": {
                  background: theme.palette.primary.dark
            }
      },
      inputField: {
      "& .MuiOutlinedInput-root": {
            "& fieldset": { 
            padding: '0.5em 4em',
            borderRadius: '10px',
            }, 
            "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main,
            borderWidth: "2px",
            }
      },
      },
      wrongInput: {
            color: "#C62828",   
            textAlign: "center",
      }
}));


interface AddBoardFormProps {
      handleClose: any,
}


const AddBoardForm: FC<AddBoardFormProps> = (props) => {
      const classes = useStyles();
      const [boardName, setBoardName] = useState('');
      let { id } = useParams<{id: string}>();

      // let history = useHistory();


      const board = {
            boardName: boardName,
      }


      function onSubmit(e: any) {
            e.preventDefault();

            axios.post('http://localhost:5000/boards/add', board, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).then((res) => {
                        console.log(res.data);
                        console.log(id);
                        axios.post(`http://localhost:5000/projects/addBoard/${id}`, board, {
                              headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                              }
                        }).then((res) => {
                              console.log(res.data);
                              // history.push("/projects");
                        }).catch((err) => {
                              console.log(err);
                        });
            }).catch((err) => {
                  console.log(err);
            });  
      } 


  return (
    <> 
      <Typography className={classes.header} component="h1" variant="h4">
            Create board
      </Typography>
      <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
            <Grid container spacing={3}>
                  <Grid item xs={12}>
                        <TextField
                        className={classes.inputField}
                        required
                        fullWidth
                        autoFocus
                        variant="outlined"
                        name="boardName"
                        id="boardName"
                        placeholder="Board Name"
                        autoComplete="board-name"
                        onChange={e => {
                              setBoardName(e.target.value);
                        }}
                        />
                  </Grid>
            </Grid>

            <Button
                  className={classes.submit}
                  onClick={props.handleClose}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
            >
            Create
            </Button>
      </form>
    </>
            

  );
}

export default AddBoardForm;