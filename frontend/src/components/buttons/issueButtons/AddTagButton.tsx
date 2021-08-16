import { ClickAwayListener, IconButton, InputBase } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, useState } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
    addTagButtonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        "& .MuiPaper-root": {
            maxWidth: '45%',
        }
    },
    iconButton: {
        // minHeight: '20px',
        // minWidth: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: '15px',
        color: theme.palette.secondary.main,
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    inputField: {
        width: 'auto',
    }
}));


interface AddTagButtonProps {
      addTag: (e: React.SyntheticEvent, newTagName: string) => void,
}


const AddTagButton: FC<AddTagButtonProps> = (props) => {
    const classes = useStyles();
    const [addMode, setAddMode] = useState<boolean>(false);
    const [newTagName, setNewTagName] = useState<string>('');

    function handleSubmit(e: any) {
        e.preventDefault();

        if(newTagName !== ''){
            props.addTag(e, newTagName);
        }

        setAddMode(false);
    }


    return (
        <>
        <div className={classes.addTagButtonWrapper} onClick={() => setAddMode(true)}>
                <ClickAwayListener onClickAway={() => setAddMode(false)}>
                    <Card>
                        {addMode &&
                            <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                                <InputBase
                                        className={classes.inputField}
                                        required
                                        autoFocus
                                        name="tagName"
                                        id="tagName"
                                        placeholder= "Tag name"
                                        autoComplete="tag-name"
                                        inputProps={{style: {fontSize: 15, padding:5}}}
                                        onChange={e => {
                                            setNewTagName(e.target.value);
                                        }}
                                />
                                <IconButton type="submit">
                                        <AddIcon className={classes.icon}/>
                                </IconButton>
                            </form>     
                        }
                        {!addMode &&
                            <IconButton className={classes.iconButton}>
                                    <AddIcon className={classes.icon}/> 
                            </IconButton>  
                        }
                    </Card>
                </ClickAwayListener>
        </div>
        </>
    );
}

export default AddTagButton;