import { FC, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => createStyles({
    nameContainer: {
        marginBottom: theme.spacing(4),
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: '24px',
        textAlign: 'start',
        "&:hover": {
                cursor: 'pointer'
        }
    },
    inputField: {
        "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    height: 'auto',
                    borderColor: theme.palette.secondary.light,
                    borderRadius: '10px',
                    borderWidth: "1px",
                },
                "&.Mui-focused fieldset": {
                    height: 'auto',
                    borderColor: theme.palette.secondary.light,
                    borderRadius: '10px',
                    borderWidth: "1px",
                },

        },
    },
}));


interface UpdateNameButtonProps {
      tempName: string,
      setTempName: React.Dispatch<React.SetStateAction<string>>,
      permName: string,
      onSubmit: (e: any) => void,
}


const UpdateNameButton: FC<UpdateNameButtonProps> = (props) => {
      const classes = useStyles();
      const [updateMode, setUpdateMode] = useState<boolean>(false);  


      function handleSubmit(e: any) {
            if(updateMode) {
                  props.onSubmit(e);
            }  
            setUpdateMode(false);
      }


      return (
        <div className={classes.nameContainer}>
            <ClickAwayListener onClickAway={handleSubmit}>
                  <div onClick={() => setUpdateMode(true)}>
                        {updateMode &&
                              <form onSubmit={handleSubmit} autoComplete="off">
                                    <TextField
                                          className={classes.inputField}
                                          required
                                          autoFocus
                                          size="small"
                                          variant='outlined'
                                          name="issueName"
                                          id="issueName"
                                          value={props.tempName}
                                          autoComplete="issue-name"
                                          inputProps={{style: {fontSize: 24, padding: 10, fontWeight: 'bold',}}}
                                          onChange={e => {
                                                props.setTempName(e.target.value);
                                          }}
                                    />
                              </form>     
                        }

                        {!updateMode &&
                              <div className={classes.nameText}>
                                    {props.permName}
                              </div>
                        }
                  </div>
            </ClickAwayListener>
        </div>
            
      );
}


export default UpdateNameButton;