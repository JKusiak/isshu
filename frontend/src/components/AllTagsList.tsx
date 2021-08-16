import { Button, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, Fragment, useContext, useState } from 'react';
import { INestedIssue, ITag } from '../types/ModelTypes';
import AddTagButton from './buttons/issueButtons/AddTagButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { BoardReducerContext } from './functional/GetBoard';
import { ActionTypes } from './reducers/BoardReducer';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tagsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    headline: {
        fontSize: '20px',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '10px',
    },
    tagItem: {
        display: 'flex',
    },
    tagIncludedCard: {
        width: '100%',
        marginBottom: '10px',
        marginRight: '10px',
        transition: 'all .12s linear',
        boxShadow: theme.shadows[2],
        border: '1px solid',
        borderColor: theme.palette.secondary.main,
        "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
        },
        "& .MuiCardContent-root": {
                padding: theme.spacing(1),
        },
    },
    tagNotIncludedCard: {
        width: '100%',
        marginBottom: '10px',
        marginRight: '10px',
        transition: 'all .12s linear',
        boxShadow: theme.shadows[2],
        "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
        },
        "& .MuiCardContent-root": {
                padding: theme.spacing(1),
        },
    },
    tagName: {
        fontSize: '12px',
    },
    deleteButton: {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        
    },
    deleteIcon: {
        color: theme.palette.secondary.main,
    }
  })
);


interface AllTagsListProps {
    issue: INestedIssue,
    updateIssueTags: () => void,
    allTags: [ITag],
    deleteTag: (e: React.SyntheticEvent, tagId: string) => void,
    addTag: (e: React.SyntheticEvent, newTagName: string) => void,
}


const AllTagsList: FC<AllTagsListProps> = (props) => {
    const classes = useStyles();
    const { dispatch } = useContext(BoardReducerContext);


    function checkIfChosen(tag: ITag) {
        return (
            props.issue.tags.some((issueTag: ITag) => issueTag._id == tag._id)? true : false
        );
    }


    function displayType(isChosen: boolean) {
        return(
            isChosen? 
            classes.tagIncludedCard : 
            classes.tagNotIncludedCard
        );
    }


    function manageClicked(e: React.SyntheticEvent, isChosen: boolean, clickedTag: ITag) {
        e.preventDefault();

        if(isChosen) {
            const tagsWithoutClicked = props.issue.tags.filter((issueTag: ITag) => issueTag._id !== clickedTag._id);

            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    tags: tagsWithoutClicked,
                },
            }

            dispatch({type: ActionTypes.UpdateIssue, payload: payload})
        } else {
            const tagsWithClicked = [...props.issue.tags, clickedTag];

            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    tags: tagsWithClicked,
                },
            }

            dispatch({type: ActionTypes.UpdateIssue, payload: payload})
        }

        props.updateIssueTags();
    }


    return (
        <div className={classes.tagsContainer}>
            <Typography className={classes.headline} component="h5" variant="h5">
                All tags
            </Typography>
            {props.allTags.map((tag: ITag, index: number) => {
                    const isChosen = checkIfChosen(tag);

                    return(
                        <div className={classes.tagItem} key={index}>
                            <Card className={displayType(isChosen)} onClick={(e) => manageClicked(e, isChosen, tag)}>
                                <CardContent>
                                    <Typography className={classes.tagName} component="h5" variant="h5">
                                            {tag.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Button className={classes.deleteButton} onClick={(e) => props.deleteTag(e, tag._id)}>
                                <DeleteIcon className={classes.deleteIcon}/>
                            </Button>  
                        </div>
                              
                    )
            })}
            <AddTagButton
                addTag={props.addTag}
            />
        </div>
    );
}

export default AllTagsList;