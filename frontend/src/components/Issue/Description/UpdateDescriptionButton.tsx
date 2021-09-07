import { ClickAwayListener, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC, useState } from 'react';
import DescriptionText from './DescriptionText';


const useStyles = makeStyles((theme: Theme) => createStyles({
      descriptionContainer: {
            maxWidth: '100%',
            marginBottom: theme.spacing(4),
      },
      descriptionTitle: {
            fontWeight: 'bold',
            fontSize: '16px',
            color: theme.palette.secondary.main,
            marginBottom: theme.spacing(1),
      },
      descriptionText: {
            textAlign: 'start',
            color: theme.palette.secondary.main,
            "&:hover": {
                  cursor: 'pointer'
            }
      },
      formContainer: {
            width: '100%',
      },
      inputField: {
            width: '100%',
            height: '100%',
            "& .MuiOutlinedInput-root": {
                  height: '100%',
                  minHeight: '10vh',
                  color: theme.palette.secondary.main,
                  "& .MuiOutlinedInput-notchedOutline": {
                        height: 'auto',
                        borderColor: theme.palette.secondary.light,
                        borderRadius: '6px',
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        height: 'auto',
                        borderColor: theme.palette.secondary.light,
                        borderWidth: "2px",
                  },
                  alignItems: 'start',
            },
            "& .MuiOutlinedInput-input": {
                  fontSize: 15,
                  padding: theme.spacing(0.5),
            },
      },
}));


interface UpdateDescriptionButtonProps {
      tempDescription: string,
      setTempDescription: React.Dispatch<React.SetStateAction<string>>,
      permDescription: string,
      onSubmit: (e: any) => void,
}


const UpdateDescriptionButton: FC<UpdateDescriptionButtonProps> = (props) => {
      const classes = useStyles();
      const [updateMode, setUpdateMode] = useState<boolean>(false);


      function handleSubmit(e: any) {
            if (updateMode) {
                  props.onSubmit(e);
            }
            setUpdateMode(false);
      }


      return (
            <>
                  <div className={classes.descriptionTitle}>Description</div>
                  <ClickAwayListener onClickAway={handleSubmit}>
                        <div className={classes.descriptionContainer} onClick={() => setUpdateMode(true)}>
                              {updateMode &&
                                    <form className={classes.formContainer} onSubmit={handleSubmit} autoComplete="off">
                                          <TextField
                                                className={classes.inputField}
                                                required
                                                autoFocus
                                                size="small"
                                                multiline={true}
                                                variant='outlined'
                                                name="issueDescription"
                                                id="issueDescription"
                                                value={props.tempDescription}
                                                autoComplete="issue-description"
                                                inputProps={{ style: {} }}
                                                onChange={e => {
                                                      props.setTempDescription(e.target.value);
                                                }}
                                          />
                                    </form>
                              }

                              {!updateMode &&
                                    <DescriptionText
                                          permDescription={props.permDescription}
                                    />
                              }
                        </div>
                  </ClickAwayListener>
            </>
      );
}


export default UpdateDescriptionButton;